from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

# class CustomUser(AbstractUser):
#     # Any additional fields for the custom user model can be added here
#     email = models.EmailField(_('email address'), unique=True)
#     username = models.CharField(max_length=150, unique=True)
#     first_name = models.CharField(max_length=150, blank=True)
#     last_name = models.CharField(max_length=150, blank=True)
#     start_date = models.DateTimeField(default=timezone.now)
#     is_staff = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=False)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []


class Seller(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Specific fields:
    gender = models.CharField(max_length=10, null=False, default='', help_text="gender of the seller")
    phone_number = models.PositiveBigIntegerField(null=False, default='', help_text="phone number of the seller")
    address = models.TextField(null=False, default='', help_text="address of the seller")
    

    def __str__(self):
        return str(self.user)