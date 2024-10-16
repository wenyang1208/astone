from django.db import models, transaction

class Notification(models.Model):
    notif_text=models.TextField()