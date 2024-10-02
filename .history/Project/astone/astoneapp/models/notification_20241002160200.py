from django.db import models, transaction

class Notification(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    to_processed_shipment = models.PositiveBigIntegerField(default=0)
    unpaid = models.PositiveBigIntegerField(default=0)

