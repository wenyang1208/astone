from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
# Register your models here
from .models.product import Product

from .models.product_to_image import ProductToImage
from .models.seller import Seller, CustomUser

admin.site.register(CustomUser, UserAdmin)
admin.site.register(Product)
admin.site.register(ProductToImage)
admin.site.register(Seller)
