from django.urls import path, include
import requests

from .views import *
from django.contrib import admin
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .views import SaveDiagnosisView,UserProfileView, AppointmentCreateView, AppointmentManageView, ArticleCreateView, ArticleListView, CommentCreateView, TrainingCreateView, TrainingAssignView, MyTrainingsView, MarkTrainingCompleteView, TherapistFreeTimeListCreateView,TherapistFreeTimeDetailView,TherapistFreeTimeByTherapistView,TherapistFreeTimeAvailabilityView,PatientTreatmentView

urlpatterns = [
    path("register/", UserRegisterationAPIView.as_view(), name="register-user"),
    path("login/", UserLoginAPIView.as_view(), name="login-user"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout-user"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('user/', UserInfoAPIView.as_view(), name="user-info"),
    path('profile/view/', UserProfileView.as_view(), name='user-profile'),
    path('appointments/create/', AppointmentCreateView.as_view(), name='appointment-create'),
    path('appointments/manage/', AppointmentManageView.as_view(), name='appointment-manage'),
    path('articles/create/', ArticleCreateView.as_view(), name='article-create'),
    path('articles/', ArticleListView.as_view(), name='article-list'),
    path('articles/comment/', CommentCreateView.as_view(), name='article-comment'),
    path('trainings/create/', TrainingCreateView.as_view(), name='training-create'),
    path('trainings/assign/', TrainingAssignView.as_view(), name='training-assign'),
    path('mytrainings/', MyTrainingsView.as_view(), name='my-trainings'),
    path('trainings/complete/', MarkTrainingCompleteView.as_view(), name='training-complete'),
    path("video/", include("videocallAPI.urls")),
    path('chatbot/message/', ChatbotMessageAPIView.as_view(), name='chatbot-message'),
    path('chatbot/save-diagnosis/', SaveDiagnosisView.as_view(), name='save-diagnosis'),
    path('free-times/<int:pk>/availability/', TherapistFreeTimeAvailabilityView.as_view(), name='free-time-availability'),
    path('therapists/<int:therapist_id>/free-times/', TherapistFreeTimeByTherapistView.as_view(), name='therapist-free-times'),
    path('free-times/<int:pk>/', TherapistFreeTimeDetailView.as_view(), name='free-time-detail'),    
    path('free-times/', TherapistFreeTimeListCreateView.as_view(), name='free-time-list-create'),
    path('profile/', complete_profile, name='complete_profile'),
    path('therapists/', TherapistListView.as_view(), name='therapist-list'),
    path("request-therapist/", RequestTherapistView.as_view(), name="request-therapist"),
    path("notifications/", TherapistNotificationList.as_view(), name="therapist-notifications"),
    path("notifications/<int:notification_id>/accept/", accept_notification),
    path("patients/<int:patient_id>/", get_patient_profile),
    path("notifications/emergency/", EmergencyNotificationView.as_view(), name="emergency-notification"),
    path('patient/treatment/', PatientTreatmentView.as_view(), name='patient-treatment'),

   

]
