from django.contrib import admin

# Register your models here.
from .models.product import Product

admin.site.register(Product)
