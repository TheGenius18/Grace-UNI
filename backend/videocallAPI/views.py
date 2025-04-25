from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import VideoCallRoom
from django.contrib.auth import get_user_model
from django.http import JsonResponse

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

# Patient polls their upcoming sessions
class MyInvitationsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.user_type != "patient":
            return Response({"error": "Only patients can check invitations."}, status=403)

        sessions = VideoCallRoom.objects.filter(patient=request.user, is_active=True)
        data = [{"room_id": str(s.id), "therapist": s.therapist.username, "created_at": s.created_at} for s in sessions]
        return Response(data)
