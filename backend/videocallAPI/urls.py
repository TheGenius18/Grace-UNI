


#router = routers.DefaultRouter()
#router.register(r"rooms", RoomViewSet)

#urlpatterns = [
#    path('api/create-room/', CreateRoomAPI.as_view()),
#    path('api/join-room/<str:room_id>/', JoinRoomAPI.as_view()),
#    path('', include(router.urls)),
#=======
from django.urls import path # type: ignore
from . import views
from .views import CreateSessionView, MyInvitationsView

urlpatterns = [
    path('', views.index, name='videocall-index'),
    path("session/create/", CreateSessionView.as_view(), name="create-session"),
    path("session/invitations/", MyInvitationsView.as_view(), name="session-invitations"),

]