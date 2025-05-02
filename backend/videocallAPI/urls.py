from django.urls import path, include
from rest_framework import routers
from .views import (
    RoomViewSet,
    CreateRoomAPI,
    JoinRoomAPI,
)

router = routers.DefaultRouter()
router.register(r"rooms", RoomViewSet)

urlpatterns = [
    path('api/create-room/', CreateRoomAPI.as_view()),
    path('api/join-room/<str:room_id>/', JoinRoomAPI.as_view()),
    path('', include(router.urls)),
]