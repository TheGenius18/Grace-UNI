from datetime import timezone
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
from API.serializers import FullProfileSerializer, TherapistSerializer,TreatmentPlanSerializer, AppointmentSerializer
from rest_framework.exceptions import PermissionDenied
import requests
from rest_framework.decorators import api_view, permission_classes
from django.core.exceptions import ObjectDoesNotExist
import json
from .models import Patient, Therapist, Region, TreatmentPlan
from django.utils import timezone


from django.db import transaction
from rest_framework.exceptions import NotFound
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt



@method_decorator(csrf_exempt, name='dispatch')
class BeginTreatmentJourneyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, therapist_id):
        try:
            patient = Patient.objects.get(user=request.user)
            therapist = Therapist.objects.get(user_id=therapist_id)

            slot_id = request.data.get("slot_id")
            if not slot_id:
                return Response({"error": "Slot ID is required."}, status=status.HTTP_400_BAD_REQUEST)


            slot = TherapistFreeTime.objects.filter(
                id=slot_id,
                therapist=therapist,
                is_available=True
            ).first()

            if not slot:
                return Response({"error": "Selected time slot is not available."}, status=status.HTTP_404_NOT_FOUND)


            existing = TherapistNotification.objects.filter(
                therapist=therapist,
                patient=patient,
                notification_type='treatment_request',
                is_read=False
            ).first()
            if existing:
                return Response({"message": "Request already sent."}, status=status.HTTP_400_BAD_REQUEST)


            appointment_number = f"APT-{therapist.user.id}-{patient.user.id}-{int(slot.start_time.timestamp())}"

            appointment = Appointment.objects.create(
                therapist=therapist,
                patient=patient,
                appointment_number=appointment_number,
                scheduled_time=slot.start_time,
                end_time=slot.end_time,
                status='scheduled'
            )


            slot.is_available = False
            slot.save()


            TherapistNotification.objects.create(
                therapist=therapist,
                patient=patient,
                appointment=appointment,
                notification_type='treatment_request',
                message=f"{patient.user.get_full_name() or patient.user.username} wants to start treatment with you. Slot: {slot.start_time.strftime('%Y-%m-%d %H:%M')}",
                related_url=f"/appointments/{appointment.id}/"
            )

            return Response({
                "message": "Request and appointment sent successfully.",
                "appointment_id": appointment.id
            }, status=status.HTTP_201_CREATED)

        except Patient.DoesNotExist:
            return Response({"error": "Patient profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Therapist.DoesNotExist:
            return Response({"error": "Therapist not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


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
        serializer = ProfileRouterSerializer(request.user)
        return Response({"profile": serializer.data})

    def post(self, request):
       print("\n=== INCOMING REQUEST DATA ===")
       print("Headers:", request.headers)
       print("User:", request.user)
       print("Data:", request.data)

       user = request.user
       required_fields = ['age', 'gender', 'sibling_order', 'marital_status']

       missing_fields = [field for field in required_fields if field not in request.data]
       if missing_fields:
           return Response(
               {"error": f"Missing required fields: {missing_fields}"},
               status=status.HTTP_400_BAD_REQUEST
           )

       try:
           # تفكيك البيانات من QueryDict إلى dict عادي
           data = request.data.copy()

           # تأكد من تحويل الحقول العددية بشكل صحيح
           if 'age' in data:
               data['age'] = int(data['age'])

           patient, created = Patient.objects.get_or_create(user=user)
           serializer = PatientSerializer(patient, data=data, partial=True)
           serializer.is_valid(raise_exception=True)
           serializer.save()

           if not user.is_profile_complete:
               user.is_profile_complete = True
               user.save()

           return Response({
               "status": "created" if created else "updated",
               "data": serializer.data
           }, status=status.HTTP_200_OK)

       except serializers.ValidationError as e:
           return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)
       except Exception as e:
           print(f"Error in UserProfileView: {str(e)}")
           return Response(
               {"error": "Internal server error"},
               status=status.HTTP_500_INTERNAL_SERVER_ERROR
           )


class AppointmentCreateView(generics.CreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            patient = Patient.objects.get(user=self.request.user)
            therapist = patient.therapist
            
            if not therapist:
                raise PermissionDenied("You don't have an assigned therapist")
            
            scheduled_time = serializer.validated_data['scheduled_time']
            end_time = serializer.validated_data['end_time']
            
            if not TherapistFreeTime.objects.filter(
                therapist=therapist,
                start_time__lte=scheduled_time,
                end_time__gte=end_time,
                is_available=True
            ).exists():
                raise serializers.ValidationError("The selected time slot is not available")
            
            appointment = serializer.save(
                patient=patient,
                therapist=therapist,
                status='scheduled'
            )
            
            TherapistFreeTime.objects.filter(
                therapist=therapist,
                start_time__lte=scheduled_time,
                end_time__gte=end_time
            ).update(is_available=False)
            
            TherapistNotification.objects.create(
                therapist=therapist,
                patient=patient,
                appointment=appointment,
                notification_type='appointment',
                message=f"New appointment scheduled with {patient.user.get_full_name()} on {scheduled_time.strftime('%Y-%m-%d at %H:%M')}",
                related_url=f"/appointments/{appointment.id}/"
            )
            
            reminder_time = scheduled_time - timedelta(days=1)
            if reminder_time > timezone.now():
                TherapistNotification.objects.create(
                    therapist=therapist,
                    patient=patient,
                    appointment=appointment,
                    notification_type='appointment',
                    message=f"Reminder: Appointment with {patient.user.get_full_name()} tomorrow at {scheduled_time.strftime('%H:%M')}",
                    related_url=f"/appointments/{appointment.id}/",
                    created_at=reminder_time
                )
                
        except Patient.DoesNotExist:
            raise PermissionDenied("Only patients can create appointments.")


class AppointmentManageView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        try:
            therapist = Therapist.objects.get(user=self.request.user)
            return Appointment.objects.filter(therapist=therapist)
        except Therapist.DoesNotExist:
            return Appointment.objects.none()

    def patch(self, request, *args, **kwargs):
        appointment_id = request.data.get("appointment_id")
        new_status = request.data.get("status")

        if new_status not in ['scheduled', 'completed', 'cancelled', 'no_show']:
            return Response({"error": "Invalid status."}, status=400)

        try:
            therapist = Therapist.objects.get(user=request.user)
            appointment = Appointment.objects.get(id=appointment_id, therapist=therapist)
        except (Therapist.DoesNotExist, Appointment.DoesNotExist):
            return Response({"error": "Appointment not found or not authorized."}, status=404)

        appointment.status = new_status
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

            rasa_url = "http://localhost:5005/webhooks/rest/webhook"
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
            except requests.exceptions.RequestException:
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

class TherapistFreeTimeListCreateView(generics.ListCreateAPIView):
    serializer_class = TherapistFreeTimeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if not hasattr(user, 'therapist'):
            raise NotFound("Therapist profile not found.")

        return TherapistFreeTime.objects.filter(therapist=user.therapist).order_by('day', 'start_time')

    def perform_create(self, serializer):
        user = self.request.user

        if not hasattr(user, 'therapist'):
            raise NotFound("Therapist profile not found.")

        serializer.save(therapist=user.therapist)
class TherapistFreeTimeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TherapistFreeTime.objects.all()
    serializer_class = TherapistFreeTimeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_therapist:
            return self.queryset.filter(therapist__user=self.request.user)
        return self.queryset.none()

class TherapistFreeTimeByTherapistView(generics.ListAPIView):
    serializer_class = TherapistFreeTimeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        therapist_id = self.kwargs['pk']
        return TherapistFreeTime.objects.filter(
            therapist_id=therapist_id,
            is_available=True
        ).order_by('day', 'start_time')
class TherapistFreeTimeAvailabilityView(generics.UpdateAPIView):
    queryset = TherapistFreeTime.objects.all()
    serializer_class = TherapistFreeTimeSerializer
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_available = request.data.get('is_available', instance.is_available)
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_profile(request):
    user = request.user
    data = request.data

    try:
        if user.user_type == 'patient':
            patient, _ = Patient.objects.get_or_create(user=user)
            patient.age = data.get('age')
            patient.gender = data.get('gender')
            patient.marital_status = data.get('marital_status')
            patient.sibling_order = data.get('sibling_order')
            patient.save()

        elif user.user_type == 'therapist':
            therapist, _ = Therapist.objects.get_or_create(user=user)
            therapist.age = data.get('age')
            therapist.gender = data.get('gender')
            therapist.marital_status = data.get('marital_status')
            
            region_name = data.get('region')
            if region_name:
                region, _ = Region.objects.get_or_create(name=region_name, defaults={'country': 'Saudi Arabia'})
                therapist.region = region

            therapist.save()

            

        user.is_profile_complete = True
        user.save()

        return Response({"message": "Profile completed successfully!"})

    except Exception as e:
        return Response({"error": str(e)}, status=400)
    


class TherapistListView(APIView):
    permission_classes = [AllowAny]  

    def get(self, request):
        therapists = Therapist.objects.all()
        serializer = TherapistSerializer(therapists, many=True)
        return Response(serializer.data)
    



class RequestTherapistView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        therapist_id = request.data.get('therapist_id')
        message = request.data.get('message', '')

        try:
            therapist = Therapist.objects.get(user__id=therapist_id)
        except Therapist.DoesNotExist:
            return Response({"error": "Therapist not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TherapistRequestSerializer(data={
            'therapist': therapist_id,
            'message': message
        })

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
        request_obj = serializer.save(patient=request.user)

      
        user_name = request.user.get_full_name() or request.user.username or request.user.email

      
        existing = TherapistNotification.objects.filter(
            therapist=therapist,
            message__icontains=user_name
        ).exists()

        if existing:
            return Response({"message": "Request already sent."}, status=status.HTTP_200_OK)

       
        TherapistNotification.objects.create(
            therapist=therapist,
            request=request_obj,
            message=f"{user_name} has requested an appointment.",
            related_url="/therapist/appointments"
        )

        return Response({"message": "Request sent successfully"}, status=status.HTTP_201_CREATED)





class TherapistNotificationList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            therapist = Therapist.objects.get(user=request.user)
        except Therapist.DoesNotExist:
            return Response({"error": "You are not a therapist."}, status=status.HTTP_403_FORBIDDEN)

        notifications = TherapistNotification.objects.filter(
            therapist=therapist
        ).order_by('-created_at')


        serializer = TherapistNotificationSerializer(notifications, many=True)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_notification(request, notification_id):
    try:
        therapist = Therapist.objects.get(user=request.user)
        notification = TherapistNotification.objects.get(id=notification_id, therapist=therapist)

      
        if notification.notification_type == 'treatment_request':
            notification.is_read = True
            notification.save()

            patient = notification.patient
            patient.therapist = therapist
            patient.save()

            TreatmentPlan.objects.create(
                therapist=therapist,
                patient=patient,
                title=f"Initial Plan for {patient.user.username}",
                type_of_therapy='cbt',
                number_of_sessions=4
            )

            return Response({"message": "Patient accepted and treatment started."}, status=200)

       
        elif notification.notification_type == 'emergency':
            notification.is_read = True
            notification.emergency_acknowledged = True
            notification.emergency_acknowledged_at = timezone.now()
            notification.save()

            return Response({"message": "Emergency acknowledged successfully."}, status=200)

        
        else:
            return Response({"error": "This notification cannot be accepted."}, status=400)

    except Therapist.DoesNotExist:
        return Response({"error": "Therapist not found for this user."}, status=403)
    except TherapistNotification.DoesNotExist:
        return Response({"error": "Notification not found."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=400)






@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_patient_profile(request, patient_id):
    try:
        user = CustomUser.objects.get(id=patient_id)
        patient = user.patient

        appointments = Appointment.objects.filter(patient=patient)
        appointments_data = AppointmentSerializer(appointments, many=True).data

        data = {
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "user_type": user.user_type,
                "is_profile_complete": user.is_profile_complete,
            },
            "age": patient.age,
            "gender": patient.gender,
            "marital_status": patient.marital_status,
            "sibling_order": patient.sibling_order,
            "diagnosis": patient.diagnosis,
            "therapist": patient.therapist.user.id if patient.therapist else None,
            "appointments": appointments_data,
        }


        return Response(data)
    except CustomUser.DoesNotExist:
        return Response({"error": "Patient not found"}, status=404)

    
    
class EmergencyNotificationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            patient = Patient.objects.get(user=request.user)
        except Patient.DoesNotExist:
            return Response({"error": "You are not a patient."}, status=status.HTTP_403_FORBIDDEN)

        if not patient.therapist:
            return Response({"error": "You don't have an assigned therapist."}, status=status.HTTP_400_BAD_REQUEST)

        emergency_title = request.data.get('emergency_title')
        emergency_description = request.data.get('emergency_description')

        if not emergency_title:
            return Response({"error": "Emergency title is required."}, status=status.HTTP_400_BAD_REQUEST)

        notification = TherapistNotification.objects.create(
            therapist=patient.therapist,
            patient=patient,
            emergency_title=emergency_title,
            emergency_description=emergency_description,
            message=f"Your patient {patient.user.username} had this emergency: {emergency_title}",
            related_url=f"/patient/{patient.user.pk}/",
            notification_type='emergency'
        )

        serializer = TherapistNotificationSerializer(notification)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    
    
    
    
    
    
class PatientTreatmentView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        try:
            patient = request.user.patient
        except Patient.DoesNotExist:
            return Response(
                {"error": "User is not a patient"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not patient.therapist:
            return Response({
                "has_therapist": False,
                "message": "Begin your treatment journey by selecting a therapist"
            })
        
        treatment_plan = TreatmentPlan.objects.filter(
            patient=patient,
            is_active=True
        ).first()
        
        if not treatment_plan:
            return Response({
                "has_therapist": True,
                "has_plan": False,
                "message": "Your therapist will create a treatment plan for you soon"
            })
        
        next_session = Appointment.objects.filter(
            patient=patient,
            status='scheduled',
            scheduled_time__gte=timezone.now()
        ).order_by('scheduled_time').first()
        
        data = {
            "has_therapist": True,
            "has_plan": True,
            "therapist": TherapistSerializer(patient.therapist).data,
            "treatment_plan": TreatmentPlanSerializer(treatment_plan).data,
            "next_session": AppointmentSerializer(next_session).data if next_session else None,
            "completed_sessions": patient.appointments.filter(status='completed').count(),
            "total_sessions": treatment_plan.number_of_sessions
        }
        
        return Response(data)

class MyPatientsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            therapist = Therapist.objects.get(user=request.user)
        except Therapist.DoesNotExist:
            return Response({"error": "You are not a therapist."}, status=status.HTTP_403_FORBIDDEN)

        patients = Patient.objects.filter(therapist=therapist)
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)



class TherapistProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = request.data.copy()
            data['age'] = int(data.get('age', 0))

            if 'region' in data:
                region_name = data.get('region')
                region, _ = Region.objects.get_or_create(name=region_name, defaults={'country': 'Saudi Arabia'})
                data['region'] = region.id

            therapist, created = Therapist.objects.get_or_create(user=request.user)
            serializer = TherapistSerializer(therapist, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            if not request.user.is_profile_complete:
                request.user.is_profile_complete = True
                request.user.save()

            return Response({"status": "created" if created else "updated", "data": serializer.data})

        except Exception as e:
            print(f"TherapistProfileView error: {e}")
            return Response({"error": str(e)}, status=500)
