# Temporary implementation to link product id with image link
from django.db import models
from astoneapp.models.product import Product

class ProductToImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    url = models.CharField(max_length=200)

    def __str__(self):
        return self.name