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
from django.urls import path, include
from astoneapp.views.product_view import * # Add necessary imports
from astoneapp.views.seller_view import *


# Add urls as needed, usually one for each view function
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('products/', GetCreateUpdateProductView),
    path('products/create/', CreateProductView),
    path('products/', GetProductView),
    path('products/images/', GetProductImagesView),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='get_product_detail'),
    path('products/<int:pk>/edit', UpdateProductView),

    # path('products/list/',ProductView.as_view(),name="Product")
]
