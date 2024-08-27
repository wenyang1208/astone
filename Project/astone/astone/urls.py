"""
URL configuration for astone project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from astoneapp.views.product_view import * # Add necessary imports
from astoneapp.views.cart_view import *
from astoneapp.views.order_view import *
from astoneapp.views.user_view import *

# Add urls as needed, usually one for each view function
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('products/', GetCreateUpdateProductView),
    path('products/create/', CreateProductView),
    path('products/', GetProductView),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='get_product_detail'),
    path('products/<int:pk>/edit', UpdateProductView),
    path('add_to_cart/<int:product_id>/', add_to_cart, name='add_to_cart'),
    path('cart/', cart_detail, name='cart_detail'),
    path('place_order/', place_order, name='place_order'),
    path('order/<int:order_id>/', order_detail, name='order_detail'),
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('user/<str:email>/', get_user_details, name='get_user_details'),
    # path('products/list/',ProductView.as_view(),name="Product")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
