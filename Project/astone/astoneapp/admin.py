from django.contrib import admin

# Register your models here
from .models.product import Product
from .models.image import Image


admin.site.register(Product)
admin.site.register(Image)
