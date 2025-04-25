from django.urls import path, include
from .views import *
from django.contrib import admin
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .views import UserProfileView, AppointmentCreateView, AppointmentManageView, ArticleCreateView, ArticleListView, CommentCreateView, TrainingCreateView, TrainingAssignView, MyTrainingsView, MarkTrainingCompleteView

urlpatterns = [
    path("register/", UserRegisterationAPIView.as_view(), name="register-user"),
    path("login/", UserLoginAPIView.as_view(), name="login-user"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout-user"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('user/', UserInfoAPIView.as_view(), name="user-info"),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
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

 
]
