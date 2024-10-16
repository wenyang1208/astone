from django.db import models, transaction

class Notification(models.Model):
    product = models.ForeignKey('Product', related_name='images', on_delete=models.CASCADE)
