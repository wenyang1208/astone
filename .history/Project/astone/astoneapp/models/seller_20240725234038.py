from django.db import models, transaction
class Seller(models.Model):
    first_name = models.CharField(max_length = 30, null=False, default='', help_text="first name of the seller")
    last_name = models.CharField(max_length = 30, null=False, default='', help_text="last name of the seller")    
    email_address = models.CharField(max_length=40, null=False, default='', help_text="email of the seller")
    


    def __str__(self):
        return self.name