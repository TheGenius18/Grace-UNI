from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework_simplejwt.views import TokenObtainPairView as OriginalObtainPairView
from .models import Room
from .serializers import (
    RoomSerializer,
    
)
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
import uuid


class CreateRoomAPI(APIView):
    def post(self, request):
        room_id = str(uuid.uuid4())
        return Response({'room_id': room_id}, status=status.HTTP_201_CREATED)

class JoinRoomAPI(APIView):
    def post(self, request, room_id):
        return Response({'status': 'Room joined'}, status=status.HTTP_200_OK)
    
class RoomViewSet(viewsets.ModelViewSet):
    
    
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def get_queryset(self):

        queryset = Room.objects.all().order_by("-created_on")

        search = self.request.query_params.get("search", None)
        if search is not None:
            queryset = Room.objects.filter(title__icontains=search).order_by(
                "-created_on"
            )
        return queryset

    def get_permissions(self):
        
        if self.action == "list" or self.action == "retrieve":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def destroy(self, request, pk=None):

        room = get_object_or_404(Room, id=pk)

        if room:
            authenticate_class = JWTAuthentication()
            user, _ = authenticate_class.authenticate(request)
            if user.id == room.user.id:
                room.delete()
            else:
                return Response(
                    {
                        "message": "Either you are not logged in or you are not the owner of this room to delete"
                    },
                    status=status.HTTP_401_UNAUTHORIZED,
                )
        return Response({}, status=status.HTTP_204_NO_CONTENT)