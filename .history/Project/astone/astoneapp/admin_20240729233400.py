from django.contrib import admin

# Register your models here
from .models.product import Product

from .models.product_to_image import ProductToImage
from .models.seller

admin.site.register(Product)
admin.site.register(ProductToImage)
