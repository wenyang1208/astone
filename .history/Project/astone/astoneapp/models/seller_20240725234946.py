from django.db import models, transaction
from astoneapp.models.product import Product
class Seller(models.Model):
    first_name = models.CharField(max_length = 30, null=False, default='', help_text="first name of the seller")
    last_name = models.CharField(max_length = 30, null=False, default='', help_text="last name of the seller")    
    email_address = models.CharField(max_length=40, null=False, default='', help_text="email of the seller")
    gender = models.CharField(max_length=10, null=False, default='', help_text="gender of the seller")
    phone_number = models.PositiveBigIntegerField(null=False, default='', help_text="phone number of the seller")
    address = models.TextField(null=False, default='', help_text="address of the seller")
    password = models.CharField(max_length = 30, null=False, default='', help_text="password of the seller")
    seller = models.ForeignKey(Product, on_delete=models)

    def __str__(self):
        return self.first_name