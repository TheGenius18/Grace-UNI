from django.test import TestCase
<<<<<<< HEAD
from django.test import TestCase
import json

from django.urls import reverse
from rest_framework import status
from rest_framework import test
from rest_framework.test import APITestCase
from rest_framework_simplejwt.serializers import TokenVerifySerializer

from videocallAPI.models import User, Room
from videocallAPI.serializers import RoomSerializer


class UserTests(APITestCase):
    def setUp(self):
        self.test_user_data = {
            "email": "testuser@gmail.com",
            "first_name": "Test",
            "last_name": "User",
            "password": "testuser123",
        }
        self.test_user = User.objects.create_user(**self.test_user_data)

    def test_create_account(self):
       
        url = reverse("create_user")
        data = {
            "email": "bobphil@gmail.com",
            "first_name": "Bob",
            "last_name": "Phil",
            "password": "testuser123",
        }

        response = self.client.post(url, data, format="json")

        created_user = User.objects.get(email="bobphil@gmail.com")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            created_user.first_name,
            "Bob",
        )
        self.assertEqual(
            created_user.last_name,
            "Phil",
        )

        content = response.data
        token = content.get("tokens")
        self.assertIsNotNone(token)

        refresh = token.get("refresh")
        access = token.get("access")
        self.assertIsNotNone(refresh)
        self.assertIsNotNone(access)

        token_verifier = TokenVerifySerializer()
        self.assertEqual(token_verifier.validate({"token": refresh}), {})
        self.assertEqual(token_verifier.validate({"token": access}), {})

    def test_token_authentication(self):
        """
        Checks for login functionality for token authentictation
        """

        url = reverse("token_obtain_pair")
        data = {
            "email": self.test_user_data["email"],
            "password": self.test_user_data["password"],
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        content = response.data
        refresh = content.get("refresh")
        access = content.get("access")
        self.assertIsNotNone(refresh)
        self.assertIsNotNone(access)

        token_verifier = TokenVerifySerializer()
        self.assertEqual(token_verifier.validate({"token": refresh}), {})
        self.assertEqual(token_verifier.validate({"token": access}), {})


class RoomTests(APITestCase):
    def setUp(self):

        self.test_user_data = {
            "email": "testuser@gmail.com",
            "first_name": "Test",
            "last_name": "User",
            "password": "testuser123",
        }
        self.test_user = User.objects.create_user(**self.test_user_data)

        url = reverse("token_obtain_pair")
        data = {
            "email": self.test_user_data["email"],
            "password": self.test_user_data["password"],
        }
        response = self.client.post(url, data, format="json")
        self.access = response.data["access"]
        self.refresh = response.data["refresh"]

        self.rooms = {
            "room_1": {
                "user": self.test_user,
                "title": "This is test room 1",
                "description": "This is description 1",
                "type_of": "OTA",
            },
            "room_2": {
                "user": self.test_user,
                "title": "This is test room 2",
                "description": "This is description 2",
                "type_of": "IO",
            },
        }

        self.test_room_1 = RoomSerializer(
            Room.objects.create(**self.rooms["room_1"])
        ).data

        self.test_room_2 = RoomSerializer(
            Room.objects.create(**self.rooms["room_2"])
        ).data

    def test_get_room_data(self):

        url = reverse("room-list")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        room_1 = None
        room_2 = None
        for room in response.data:
            if room["id"] == 1:
                room_1 = room
            elif room["id"] == 2:
                room_2 = room
        self.assertEqual(room_1["title"], self.test_room_1["title"])
        self.assertEqual(room_2["title"], self.test_room_2["title"])

    def test_post_room_data(self):

        url = reverse("room-list")
        room_data = {
            "user": self.test_user.id,
            "title": "My New Room",
            "description": "This is my new room",
            "type_of": "OTA",
        }

        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.access)
        response = self.client.post(url, room_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["room_id"], "room3")
        self.assertEqual(Room.objects.get(id=3).title, "My New Room")
=======

# Create your tests here.
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5
