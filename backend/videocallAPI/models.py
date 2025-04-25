from django.db import models
from django.contrib.auth import get_user_model
import uuid
# Create your models here.
User = get_user_model()

class VideoCallRoom(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    therapist = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions_created')
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions_received')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Session: {self.therapist.username} → {self.patient.username}"