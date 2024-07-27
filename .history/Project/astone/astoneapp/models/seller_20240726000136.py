from django.db import models
from django.contrib.auth.models import User

class Seller(models.Model): 
    gender = models.CharField(max_length=10, null=False, default='', help_text="gender of the seller")
    phone_number = models.PositiveBigIntegerField(null=False, default='', help_text="phone number of the seller")
    address = models.TextField(null=False, default='', help_text="address of the seller")
    password = models.CharField(max_length = 30, null=False, default='', help_text="password of the seller")

    def __str__(self):
        return self.first_name