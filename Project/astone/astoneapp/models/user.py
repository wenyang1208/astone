from django.db import models

class CustomUser(models.Model):
    # username = models.CharField(max_length=25, blank=True, null=True)
    
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=25, blank=True, null=False)
    last_name = models.CharField(max_length=25, blank=True, null=False)

    gender = models.CharField(max_length=10, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)

    password = models.CharField(max_length=50)

    def __str__(self):
        return self.email