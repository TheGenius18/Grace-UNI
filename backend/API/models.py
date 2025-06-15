from django.db import models # type: ignore
from django.contrib.auth.models import AbstractUser

from rest_framework import serializers


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    
    USER_TYPE_CHOICES = (
        ('patient', 'Patient'),
        ('therapist', 'Therapist'),
    )
    
    user_type = models.CharField(
    max_length=10, 
    choices=USER_TYPE_CHOICES,
    default='patient'  
)
    phone = models.CharField(max_length=20, blank=True, null=True)
    is_profile_complete = models.BooleanField(default=False)
    visotype = models.CharField(max_length=50, blank=True, null=True, 
                              help_text="Account verification status or type")

    def __str__(self) -> str:
        return self.email

class Region(models.Model):
    name = models.CharField(max_length=100, unique=True)
    country = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.name}, {self.country}"
    

    
class Therapist(models.Model):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
    )

    MARITAL_STATUS_CHOICES = (
        ('single', 'Single'),
        ('married', 'Married'),
        ('divorced', 'Divorced'),
        ('widowed', 'Widowed'),
    )

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    
    
    rank = models.IntegerField(default=0, help_text="Therapist ranking from 0 to 10")
    region = models.ForeignKey(Region, on_delete=models.SET_NULL, null=True, blank=True)
    education = models.CharField(max_length=255, blank=True)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    marital_status = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES, blank=True, null=True)
    motto = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)

    experience = models.PositiveIntegerField(default=0)
    specialization = models.CharField(max_length=255, blank=True)
    availability = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return f"Therapist: {self.user.email}"

class Education(models.Model):
    DEGREE_CHOICES = (
        ('bachelors', "Bachelor's"),
        ('masters', "Master's"),
        ('phd', "PhD"),
        ('md', "MD"),
        ('other', "Other"),
    )
    
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name='educations')
    degree = models.CharField(max_length=50, choices=DEGREE_CHOICES)
    institution = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255)
    year_completed = models.PositiveIntegerField()
    is_verified = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.degree} from {self.institution}"

class Experience(models.Model):
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name='experiences')
    position = models.CharField(max_length=255)
    organization = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    current = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.position} at {self.organization}"

class Specialization(models.Model):
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name='specializations')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

class Language(models.Model):
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name='languages')
    name = models.CharField(max_length=50)
    proficiency = models.CharField(max_length=50, blank=True, null=True)
    
    def __str__(self):
        return self.name

class Patient(models.Model):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
    )
    
    MARITAL_STATUS_CHOICES = (
        ('single', 'Single'),
        ('married', 'Married'),
        ('divorced', 'Divorced'),
        ('widowed', 'Widowed'),
    )
    
    SIBLING_ORDER_CHOICES = (
        ('only', 'Only child'),
        ('oldest', 'Oldest'),
        ('middle', 'Middle'),
        ('youngest', 'Youngest'),
    )
    
    
    
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    therapist = models.ForeignKey(Therapist, on_delete=models.SET_NULL, null=True, blank=True, related_name='patients')
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    sibling_order = models.CharField(max_length=10, choices=SIBLING_ORDER_CHOICES, blank=True, null=True)
    diagnosis = models.CharField(max_length=100, blank=True, null=True)
    marital_status = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES, blank=True, null=True)
    
    def __str__(self):
        return f"Patient: {self.user.email}"

class TherapistFreeTime(models.Model):
    DAY_CHOICES = (
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday'),
        ('sunday', 'Sunday'),
    )
    
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name='free_times')
    day = models.CharField(max_length=10, choices=DAY_CHOICES)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_available = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.therapist.user.email} available from {self.start_time} to {self.end_time}"

class Appointment(models.Model):
    STATUS_CHOICES = (
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
    )
    
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name='appointments')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    appointment_number = models.CharField(max_length=50, unique=True)
    scheduled_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Appointment #{self.appointment_number}"
    
    class Meta:
        ordering = ['-scheduled_time']  

class TreatmentPlan(models.Model):
    THERAPY_TYPE_CHOICES = (
        ('cbt', 'Cognitive Behavioral Therapy'),
        ('dbt', 'Dialectical Behavior Therapy'),
        ('psychodynamic', 'Psychodynamic Therapy'),
        ('humanistic', 'Humanistic Therapy'),
        ('other', 'Other'),
    )
    
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name='treatment_plans')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='treatment_plans')
    title = models.CharField(max_length=255)
    type_of_therapy = models.CharField(max_length=50, choices=THERAPY_TYPE_CHOICES)
    number_of_sessions = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"Treatment Plan: {self.title}"

class TreatmentGoal(models.Model):
    treatment_plan = models.ForeignKey(TreatmentPlan, on_delete=models.CASCADE, related_name='goals')
    description = models.TextField()
    is_achieved = models.BooleanField(default=False)
    target_date = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return f"Goal for {self.treatment_plan}"

class TreatmentSessionTopic(models.Model):
    treatment_plan = models.ForeignKey(TreatmentPlan, on_delete=models.CASCADE, related_name='session_topics')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    session_number = models.PositiveIntegerField()
    
    def __str__(self):
        return f"Session {self.session_number}: {self.title}"

class TherapistMemo(models.Model):
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name='memos')
    subject = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.subject



class TherapistNotification(models.Model):
    NOTIFICATION_TYPE_CHOICES = (
        ('request', 'Therapist Request'),
        ('appointment', 'Appointment'),
        ('emergency', 'Emergency'),
        ('general', 'General'),
    )
    
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name='notifications')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, null=True, blank=True, related_name='sent_notifications')
    request = models.ForeignKey('TherapistRequest', on_delete=models.SET_NULL, null=True, blank=True)
    appointment = models.ForeignKey('Appointment', on_delete=models.SET_NULL, null=True, blank=True)
    
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPE_CHOICES)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    related_url = models.URLField(blank=True, null=True)
    
    emergency_title = models.CharField(max_length=255, blank=True, null=True)
    emergency_description = models.TextField(blank=True, null=True)
    emergency_acknowledged = models.BooleanField(default=False)
    emergency_acknowledged_at = models.DateTimeField(blank=True, null=True)
    emergency_severity = models.PositiveSmallIntegerField(
        blank=True, 
        null=True,
        help_text="Severity level from 1 (low) to 10 (critical)"
    )

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Therapist Notification'
        verbose_name_plural = 'Therapist Notifications'
        indexes = [
            models.Index(fields=['therapist', 'is_read']),
            models.Index(fields=['created_at']),
            models.Index(fields=['notification_type']),
        ]

    def __str__(self):
        prefix = ""
        if self.notification_type == 'emergency':
            prefix = "🚨 EMERGENCY: "
        elif self.notification_type == 'request':
            prefix = "📨 REQUEST: "
        return f"{prefix}{self.message[:50]}..."

    def save(self, *args, **kwargs):
        if not self.notification_type:
            if self.request:
                self.notification_type = 'request'
            elif self.appointment:
                self.notification_type = 'appointment'
            elif self.emergency_title:
                self.notification_type = 'emergency'
            else:
                self.notification_type = 'general'
        
        if self.notification_type == 'emergency' and not self.message and self.patient:
            self.message = (
                f"Your patient {self.patient.user.get_full_name() or self.patient.user.username} "
                f"reported an emergency: {self.emergency_title}"
            )
        
        super().save(*args, **kwargs)

    @property
    def is_emergency(self):
        return self.notification_type == 'emergency'

# class Appointment(models.Model):
#     STATUS_CHOICES = (
#         ('pending', 'Pending'),
#         ('approved', 'Approved'),
#         ('declined', 'Declined'),
#         ('cancelled', 'Cancelled'),
#     )

#     patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
#     therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name='appointments')
#     date = models.DateField()
#     time = models.TimeField()
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
#     notes = models.TextField(blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Appointment ({self.patient.user.username} → {self.therapist.user.username})"


class Article(models.Model):
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name='articles')
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient.user.username} on {self.article.title}"
    


class Training(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name='trainings')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class TrainingAssignment(models.Model):
    training = models.ForeignKey(Training, on_delete=models.CASCADE, related_name='assignments')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='assigned_trainings')
    assigned_at = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.training.title} → {self.patient.user.username}"

class TherapistRequest(models.Model):
    patient = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="sent_requests")
    therapist = models.ForeignKey(Therapist, on_delete=models.CASCADE, related_name="received_requests")
    created_at = models.DateTimeField(auto_now_add=True)
    message = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Request from {self.patient.username} to {self.therapist.user.username}"
