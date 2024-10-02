from django.db import models, transaction

class Notification(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    unpaid = models.PositiveBigIntegerField(default=0)
    to_processed_shipment = models.PositiveBigIntegerField(default=0)
    processed_shipment = models.PositiveBigIntegerField(default=0)
        pending_cancellation = models.PositiveBigIntegerField(default=0)
    pending_cancellation = models.PositiveBigIntegerField(default=0)
    pending_return = models.PositiveBigIntegerField(default=0)
    removed_product = models.PositiveBigIntegerField(default=0)

