from django.urls import path
from . import views
from .views import CreateSessionView, MyInvitationsView

urlpatterns = [
    path('', views.index, name='videocall-index'),
    path("session/create/", CreateSessionView.as_view(), name="create-session"),
    path("session/invitations/", MyInvitationsView.as_view(), name="session-invitations"),
]