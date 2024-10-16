from django.db import models, transaction
from astoneapp.models import 

class Notification(models.Model):
    custom_user = models.ForeignKey(custom_user)
    notif_for = models.CharField(max_length=200, verbose_name='Notification for')
    notif_created_time=models.DateTimeField(auto_now_add=True)
    notifiread_status=models.BooleanField(default=False)
