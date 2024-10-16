from django.db import models, transaction

class Notification(models.Model):
    notif_text=models.TextField()
    notif_for=models.CharField()
    notif_created_time=models.DateTimeField
