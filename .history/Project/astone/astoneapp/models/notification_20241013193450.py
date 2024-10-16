from django.db import models, transaction

class Notification(models.Model):
    notif_for = 
    notif_created_time=models.DateTimeField(auto_now_add=True)
    notifiread_status=models.BooleanField(default=False)
