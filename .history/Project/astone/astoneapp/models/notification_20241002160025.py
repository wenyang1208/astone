from django.db import models, transaction
from astoneapp.models.product import Product

class Notification(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    to_processed_shipment = models.IntegerField(default=0)
    quantity = models.IntegerField(default=1)
    size = models.CharField(max_length=10, default='M', help_text="Size of the product")
    color = models.CharField(max_length=20, default='#FF0000', help_text="Hex code for the color of the product")

