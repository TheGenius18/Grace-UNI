
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
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import VideoCallRoom
from django.contrib.auth import get_user_model
from django.http import JsonResponse

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


def index(request):
    return JsonResponse({"message": "VideoCall API is live."})
User = get_user_model()

class CreateSessionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.user_type != "therapist":
            return Response({"error": "Only therapists can create sessions."}, status=403)

        patient_id = request.data.get("patient_id")
        try:
            patient = User.objects.get(id=patient_id, user_type="patient")
        except User.DoesNotExist:
            return Response({"error": "Invalid patient ID."}, status=400)

        session = VideoCallRoom.objects.create(therapist=user, patient=patient)
        return Response({
            "room_id": str(session.id),
            "patient": patient.username,
            "created_at": session.created_at
        }, status=201)


class MyInvitationsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.user_type != "patient":
            return Response({"error": "Only patients can check invitations."}, status=403)

        sessions = VideoCallRoom.objects.filter(patient=request.user, is_active=True)
        data = [{"room_id": str(s.id), "therapist": s.therapist.username, "created_at": s.created_at} for s in sessions]
        return Response(data)

