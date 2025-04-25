from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, Patient, Therapist ,Appointment,Article, Comment,Training,TrainingAssignment




class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "user_type")


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    passwordcheck = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "password", "passwordcheck", "user_type")
        extra_kwargs = {
            "password": {"write_only": True},
            "user_type": {"required": True}
        }

    def validate(self, attrs):
        if attrs["password"] != attrs["passwordcheck"]:
            raise serializers.ValidationError("Passwords do not match.")

        if len(attrs["password"]) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters.")

        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password")
        validated_data.pop("passwordcheck")
        return CustomUser.objects.create_user(password=password, **validated_data)


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials.")




class PatientSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Patient
        fields = [
            'user', 
            'age',
            'gender',
            'sibling_order',
            'diagnosis',
            'marital_status',
            'therapist'
        ]


class TherapistSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    patients = serializers.SerializerMethodField()

    class Meta:
        model = Therapist
        fields = [
            'id', 'user', 'age', 'gender',
            'education', 'experience',
            'specialization', 'availability',
            'patients'
        ]

    def get_patients(self, obj):
        return [p.user.get_full_name() for p in obj.patients.all()]




class FullProfileSerializer(serializers.Serializer):
    user = CustomUserSerializer(read_only=True)
    profile = serializers.SerializerMethodField()

    def get_profile(self, obj):
        if obj.user_type == 'patient':
            patient = Patient.objects.filter(user=obj).first()
            return PatientSerializer(patient).data if patient else None
        elif obj.user_type == 'therapist':
            therapist = Therapist.objects.filter(user=obj).first()
            return TherapistSerializer(therapist).data if therapist else None
        return None




class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'therapist', 'date', 'time', 'status', 'created_at']
        read_only_fields = ['status', 'created_at']



class CommentSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_at', 'patient_name']

    def get_patient_name(self, obj):
        return obj.patient.user.username


class ArticleSerializer(serializers.ModelSerializer):
    therapist_name = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'created_at', 'therapist_name', 'comments']

    def get_therapist_name(self, obj):
        return obj.therapist.user.username


class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Training
        fields = ['id', 'title', 'description', 'created_by', 'created_at']
        read_only_fields = ['created_by', 'created_at']


class TrainingAssignmentSerializer(serializers.ModelSerializer):
    training_title = serializers.ReadOnlyField(source='training.title')
    patient_name = serializers.ReadOnlyField(source='patient.user.username')

    class Meta:
        model = TrainingAssignment
        fields = [
            'id',
            'training',
            'training_title',
            'patient',
            'patient_name',
            'assigned_at',
            'is_completed'
        ]
        read_only_fields = ['assigned_at']
