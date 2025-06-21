from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, Patient, Therapist ,Appointment,Article, Comment, TherapistNotification, TherapistRequest,Training,TrainingAssignment,TherapistFreeTime,TreatmentPlan, TreatmentGoal, TreatmentSessionTopic





class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "user_type","is_profile_complete")


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
    therapist = serializers.PrimaryKeyRelatedField(
        queryset=Therapist.objects.all(),
        required=False,
        allow_null=True
    )
    diagnosis = serializers.CharField(required=False, allow_blank=True)
    # therapist = serializers.PrimaryKeyRelatedField(
    #     queryset=Therapist.objects.all(),
    #     required=False,
    #     allow_null=True
    # )

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
    def validate_age(self, value):
        if value < 18 or value > 90:
            raise serializers.ValidationError("Age must be between 18 and 90")
        return value
        
    def validate_gender(self, value):
        if value.lower() not in ['male', 'female']:
            raise serializers.ValidationError("Gender must be either male or female")
        return value.lower()


class TherapistSerializer(serializers.ModelSerializer):
    therapist_id = serializers.IntegerField(source='user.id', read_only=True)
    user = CustomUserSerializer(read_only=True)
    patients = serializers.SerializerMethodField()

    class Meta:
        model = Therapist
        fields = [
            'therapist_id', 'user', 'age', 'gender',
            'marital_status', 'education',
            'experience', 'specialization',
            'availability', 'motto', 'rank',
            'region', 'patients'
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





class TreatmentGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreatmentGoal
        fields = ['id', 'description', 'is_achieved', 'target_date']

class TreatmentSessionTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = TreatmentSessionTopic
        fields = ['id', 'title', 'description', 'session_number']

class TreatmentPlanSerializer(serializers.ModelSerializer):
    goals = TreatmentGoalSerializer(many=True, read_only=True)
    session_topics = TreatmentSessionTopicSerializer(many=True, read_only=True)
    completed_sessions = serializers.SerializerMethodField()
    
    class Meta:
        model = TreatmentPlan
        fields = [
            'id', 'title', 'type_of_therapy', 'number_of_sessions',
            'created_at', 'goals', 'session_topics', 'completed_sessions'
        ]
    
    def get_completed_sessions(self, obj):
        return obj.patient.appointments.filter(status='completed').count()



class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    date = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = [
            'id',
            'patient',
            'therapist',
            'appointment_number',
            'scheduled_time',
            'end_time',
            'status',
            'created_at',
            'date',
            'time',
        ]
        read_only_fields = ['status', 'created_at', 'patient', 'appointment_number']

    def get_date(self, obj):
        return obj.scheduled_time.date()

    def get_time(self, obj):
        return obj.scheduled_time.time().strftime('%H:%M:%S')


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


class ChatbotMessageSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=1000)
    
    
class TherapistFreeTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TherapistFreeTime
        fields = ['id', 'therapist', 'day', 'start_time', 'end_time', 'is_available']
        read_only_fields = ['therapist']  

    def validate(self, data):
        """
        Validate that start_time is before end_time
        """
        if data['start_time'] >= data['end_time']:
            raise serializers.ValidationError("End time must be after start time")
        return data



class TherapistRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TherapistRequest
        fields = ['id', 'therapist', 'patient', 'created_at']
        read_only_fields = ['patient', 'created_at']


class TherapistNotificationSerializer(serializers.ModelSerializer):
    patient_name = serializers.SerializerMethodField()
    patient_id = serializers.SerializerMethodField()
    is_emergency = serializers.SerializerMethodField()
    
    class Meta:
        model = TherapistNotification
        fields = [
            'id', 'message', 'is_read', 'created_at', 'related_url',
            'patient_name', 'patient_id', 'is_emergency',
            'emergency_title', 'emergency_description',
            'notification_type', 'emergency_severity'
        ]
    
    def get_patient_name(self, obj):
        if obj.patient:
            return obj.patient.user.get_full_name() or obj.patient.user.username
        return None
    
    def get_patient_id(self, obj):
        if obj.patient:
            return obj.patient.user.id
        return None
    
    def get_is_emergency(self, obj):
        return obj.is_emergency


class BeginTreatmentSerializer(serializers.Serializer):
    therapist_id = serializers.IntegerField()

class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['scheduled_time', 'end_time', 'notes']
        
    def validate(self, data):
        if data['end_time'] <= data['scheduled_time']:
            raise serializers.ValidationError("End time must be after start time")
        return data