from django.shortcuts import render
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics, permissions
from .models import Appointment, Patient, Therapist,Article, Comment
from rest_framework.views import APIView
from API.serializers import FullProfileSerializer, AppointmentSerializer
from rest_framework.exceptions import PermissionDenied
import requests
class UserRegisterationAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {
            "refresh": str(token),
            "access": str(token.access_token)
        }
        return Response(data, status=status.HTTP_201_CREATED)

    

    

class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        user = serializer.validated_data
        serializer = CustomUserSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh":str(token),
                          "access":str(token.access_token)}
        return Response(data,status=status.HTTP_200_OK)
    
class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self,request,*args,**kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = FullProfileSerializer(request.user)
        return Response(serializer.data)
    


class AppointmentCreateView(generics.CreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            patient = Patient.objects.get(user=self.request.user)
        except Patient.DoesNotExist:
            raise PermissionDenied("Only patients can create appointments.")
        
        serializer.save(patient=patient, status='pending')




class AppointmentManageView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        try:
            therapist = Therapist.objects.get(user=self.request.user)
            return Appointment.objects.filter(therapist=therapist)
        except Therapist.DoesNotExist:
            return Appointment.objects.none()

    def post(self, request, *args, **kwargs):
        appointment_id = request.data.get("appointment_id")
        status_update = request.data.get("status")

        if status_update not in ['approved', 'declined', 'cancelled']:
            return Response({"error": "Invalid status."}, status=400)

        try:
            therapist = Therapist.objects.get(user=request.user)
            appointment = Appointment.objects.get(id=appointment_id, therapist=therapist)
        except (Therapist.DoesNotExist, Appointment.DoesNotExist):
            return Response({"error": "Appointment not found or not authorized."}, status=404)

        appointment.status = status_update
        appointment.save()
        return Response(AppointmentSerializer(appointment).data, status=200)
    

class ArticleCreateView(generics.CreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            therapist = Therapist.objects.get(user=self.request.user)
        except Therapist.DoesNotExist:
            raise PermissionDenied("Only therapists can create articles.")
        serializer.save(therapist=therapist)
        
class ArticleListView(generics.ListAPIView):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all().order_by('-created_at')

class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            patient = Patient.objects.get(user=self.request.user)
        except Patient.DoesNotExist:
            raise PermissionDenied("Only patients can comment.")
        
        article_id = self.request.data.get('article_id')
        try:
            article = Article.objects.get(id=article_id)
        except Article.DoesNotExist:
            raise PermissionDenied("Article not found.")

        serializer.save(patient=patient, article=article)



class TrainingCreateView(generics.CreateAPIView):
    serializer_class = TrainingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            therapist = Therapist.objects.get(user=self.request.user)
        except Therapist.DoesNotExist:
            raise PermissionDenied("Only therapists can create trainings.")
        serializer.save(created_by=therapist)


class TrainingAssignView(generics.CreateAPIView):
    serializer_class = TrainingAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            therapist = Therapist.objects.get(user=self.request.user)
        except Therapist.DoesNotExist:
            raise PermissionDenied("Only therapists can assign trainings.")
        
        serializer.save()


class MyTrainingsView(generics.ListAPIView):
    serializer_class = TrainingAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        try:
            patient = Patient.objects.get(user=self.request.user)
        except Patient.DoesNotExist:
            raise PermissionDenied("Only patients can view their trainings.")
        
        return TrainingAssignment.objects.filter(patient=patient)



class MarkTrainingCompleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            patient = Patient.objects.get(user=request.user)
        except Patient.DoesNotExist:
            raise PermissionDenied("Only patients can update training status.")

        training_id = request.data.get("training_id")
        try:
            assignment = TrainingAssignment.objects.get(id=training_id, patient=patient)
        except TrainingAssignment.DoesNotExist:
            return Response({"error": "Training not found."}, status=404)

        assignment.is_completed = True
        assignment.save()
        return Response({"status": "completed"})


class ChatbotMessageAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChatbotMessageSerializer(data=request.data)
        if serializer.is_valid():
            user_message = serializer.validated_data['message']
            sender_id = str(request.user.id)

            rasa_url = "http://127.0.0.1:5005/webhooks/rest/webhook"



            payload = {
                "sender": sender_id,
                "message": user_message
            }

            try:
                response = requests.post(rasa_url, json=payload, timeout=15)
                if response.status_code == 200:
                    return Response(response.json(), status=200)
                else:
                    return Response({"error": "Chatbot service error."}, status=502)
            except requests.exceptions.RequestException as e:
                print(" Error connecting to Rasa:", str(e))
                return Response({"error": "Unable to connect to chatbot server."}, status=503)

        return Response(serializer.errors, status=400)


class SaveDiagnosisView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        diagnosis = request.data.get("diagnosis")

        if not diagnosis:
            return Response({"error": "No diagnosis provided."}, status=400)

        try:
            patient = Patient.objects.get(user=user)
            patient.diagnosis = diagnosis
            patient.save()
            return Response({"message": "Diagnosis saved successfully."})
        except Patient.DoesNotExist:
            return Response({"error": "Patient profile not found."}, status=404)

