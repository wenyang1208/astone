from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
# Register your models here
from .models.product import Product

from .models.seller import Seller
from .models.promotion import Promotion

admin.site.register(Product)
admin.site.register(Seller)
admin.site.register(Promotion)
from .models.image import Image



admin.site.register(Image)
