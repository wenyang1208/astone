from django.db import models, transaction
from astoneapp.models.product import Product
from astoneapp.models.seller import Product

class Order(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    address = models.CharField(max_length=255, help_text="Delivery address", default="")

class OrderItem(models.Model):
    seller = models.ForeignKey(Seller, )
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.CharField(max_length=10, default='M', help_text="Size of the product")
    color = models.CharField(max_length=20, default='#FF0000', help_text="Hex code for the color of the product")
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)