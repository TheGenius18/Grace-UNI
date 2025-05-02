<<<<<<< HEAD
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
=======
from django.urls import path
from . import views
from .views import CreateSessionView, MyInvitationsView

urlpatterns = [
    path('', views.index, name='videocall-index'),
    path("session/create/", CreateSessionView.as_view(), name="create-session"),
    path("session/invitations/", MyInvitationsView.as_view(), name="session-invitations"),
>>>>>>> 5cdcdfa78f67d012eb71674650a7704f3fef30e5
]