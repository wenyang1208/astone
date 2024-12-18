from django.db import models, transaction
from astoneapp.models import user,Seller

class Notification(models.Model):
    custom_user = models.ForeignKey(User, on_delete=models.CASCADE)
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    notif_for = models.CharField(max_length=200, verbose_name='Notification for')
    notif_created_time=models.DateTimeField(auto_now_add=True)
    notifiread_status=models.BooleanField(default=False)
