from .models import CustomUser
from rest_framework import serializers
from django.contrib.auth import authenticate
from uuid import uuid4 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Room

User = CustomUser

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        return data


class RegisterTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'user_type')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type=validated_data['user_type']  
        )
        return user

class RoomSerializer(serializers.ModelSerializer):

    """
    Room Serialiser
    """

    room_id = serializers.SerializerMethodField()
    created_on = serializers.DateTimeField(
        format="%a %I:%M %p, %d %b %Y", required=False
    )

    class Meta:
        model = Room
        fields = [
            "id",
            "user",
            "title",
            "description",
            "type_of",
            "created_on",
            "room_id",
        ]

    def get_room_id(self, obj):
        if obj.type_of == "IO":
            return "room" + str(uuid4().hex)
        return "room" + str(obj.id)