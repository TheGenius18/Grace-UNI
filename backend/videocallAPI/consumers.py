import json
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from asgiref.sync import sync_to_async
from django.contrib.auth import get_user_model

User = get_user_model()

class VideoCallConsumer(AsyncWebsocketConsumer):
    rooms = {} 

    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"videocall_{self.room_name}"
        
        if self.room_name not in self.rooms:
            self.rooms[self.room_name] = {"users": []}
            
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, 'user_id') and self.room_name in self.rooms:
            if self.user_id in self.rooms[self.room_name]["users"]:
                self.rooms[self.room_name]["users"].remove(self.user_id)
                
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "user_disconnected",
                        "user_id": self.user_id
                    }
                )
        
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            message_type = data.get("type")

            if message_type == "authenticate":
                try:
                    auth = JWTAuthentication()
                    validated_token = auth.get_validated_token(data["token"])
                    user = await sync_to_async(auth.get_user)(validated_token)
                    self.user_id = str(user.id)
                    
                    if self.user_id not in self.rooms[self.room_name]["users"]:
                        self.rooms[self.room_name]["users"].append(self.user_id)
                    
                    await self.channel_layer.group_send(
                        self.room_group_name,
                        {
                            "type": "user_joined",
                            "user_id": self.user_id,
                            "users": self.rooms[self.room_name]["users"]
                        }
                    )
                    
                except (InvalidToken, AuthenticationFailed) as e:
                    await self.close(code=4001)
                    return

            elif message_type in ["offer", "answer", "candidate"]:
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": message_type,
                        "sender": self.user_id,
                        "receiver": data.get("to"),
                        "data": data.get("data")
                    }
                )

        except json.JSONDecodeError:
            await self.close(code=4000)

    async def user_joined(self, event):
        await self.send(text_data=json.dumps({
            "type": "user_joined",
            "user_id": event["user_id"],
            "users": event["users"]
        }))

    async def user_disconnected(self, event):
        await self.send(text_data=json.dumps({
            "type": "user_disconnected",
            "user_id": event["user_id"]
        }))

    async def offer(self, event):
        if str(self.user_id) == str(event["receiver"]):
            await self.send(text_data=json.dumps({
                "type": "offer",
                "sender": event["sender"],
                "data": event["data"]
            }))

    async def answer(self, event):
        if str(self.user_id) == str(event["receiver"]):
            await self.send(text_data=json.dumps({
                "type": "answer",
                "sender": event["sender"],
                "data": event["data"]
            }))

    async def candidate(self, event):
        if str(self.user_id) == str(event["receiver"]):
            await self.send(text_data=json.dumps({
                "type": "candidate",
                "sender": event["sender"],
                "data": event["data"]
            }))