from django.db import models

class CustomUser(models.Model):
    username = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    password = models.CharField(max_length=50)

    # Add any other fields relevant to your store

    def __str__(self):
        return self.username