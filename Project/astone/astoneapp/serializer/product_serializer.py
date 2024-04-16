from rest_framework import serializers
from astoneapp.models.product import Product

# Serializer serialize model instances into json objects for response
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'currency', 'price', 'quantity']