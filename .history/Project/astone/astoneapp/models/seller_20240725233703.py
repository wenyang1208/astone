from django.db import models, transaction
class Seller(models.Model):
    first_name = models.CharField(max_length = 30, null=False, default='', help_text="name of the seller")    
    description = models.CharField(max_length = 100, null=False, default='', help_text="description of the product")    

    def __str__(self):
        return self.name