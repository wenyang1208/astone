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
from astoneapp.views.seller_view import *
from astoneapp.views.promotion_view import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from astoneapp.views.cart_view import *
from astoneapp.views.order_view import *
from astoneapp.views.user_view import *
from astoneapp.views.todo_view import *

# Add urls as needed, usually one for each view function
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('products/create/', ProductListCreate.as_view(), name="product_list"),
    path('auth_products/', ProductListCreate.as_view(), name='products'),
    path('products/', GetProductView, name='products'),
    # path('products/images/', GetProductImagesView),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='get_product_detail'),
    path('products/<int:pk>/edit', UpdateProductView),
    path('add_to_cart/<int:product_id>/', add_to_cart, name='add_to_cart'),
    path('cart/', cart_detail, name='cart_detail'),
    path('update_cart/<int:product_id>/', update_cart_item, name='update_cart'),
    path('place_order/', place_order, name='place_order'),
    path('order/<int:order_id>/', order_detail, name='order_detail'),
    path('order/<int:order_id>/edit', update_order_seller, name='update_order'),
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('user/<str:email>/', get_user_details, name='get_user_details'),
    path('userupdate/<str:email>/', update_user_details, name='update_user_details'),
    path('seller/register/', SellerRegisterView.as_view(), name='sign_up_seller'),
    path('seller/token/', SellerTokenObtainPairView.as_view(), name='get_token'), # act as permissions/authentication everytime we access a website, make request
    path('seller/token/refresh', TokenRefreshView.as_view(), name='refresh'),
    path('seller/<int:pk>/', SellerGetView.as_view(), name='get_seller'),
    path('api-auth/', include('rest_framework.urls')), #pre-built url from rest framework
    path('promotions/', PromotionListCreate.as_view(), name='promotions'),
    path('promotions/<int:promotion_id>/delete/', PromotionDelete.as_view(), name='delete_promotions'),
    path('seller/seller-forgot-password/', SellerForgotPassword.as_view(), name='seller_forgot_password'),
    path('seller/seller-change-password/<int:user_id>/', SellerChangePassword.as_view(), name='change-seller-password'),
    path('forgot-password/', forgot_password, name='forgot-password'),
    path('change-password/<int:user_id>/', change_password, name='change-password'),
    path('seller/<int:seller_id>/increment-shipment/', increment_processed_shipment, name='increase_processed_shipment'),
    path('seller/<int:pk>/orders/', SellerOrdersView.as_view(), name='seller-orders'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
