from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import CustomUser, Patient, Therapist

@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.user_type == 'patient':
            Patient.objects.create(user=instance, age=0, gender='male')  # default values
        elif instance.user_type == 'therapist':
            Therapist.objects.create(user=instance, age=0, gender='male')
