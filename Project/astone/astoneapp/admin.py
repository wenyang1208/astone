from django.contrib import admin

# Register your models here
from .models.product import Product
from .models.image import Image
from .models.cart import Cart, CartItem
from .models.order import Order, OrderItem
from .models.user import CustomUser

admin.site.register(Product)
admin.site.register(Image)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(CustomUser)

