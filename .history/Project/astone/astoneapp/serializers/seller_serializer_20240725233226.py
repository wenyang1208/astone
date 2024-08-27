from rest_framework import serializers
from astoneapp.models.product import Seller
from astoneapp.models.product_to_image import ProductToImage

# Serializer serialize model instances into json objects for response
class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        # Only accept password, but not returning the password
        extra_kwargs = {'password': {'write_only': True}}

class ProductCreateResponseSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)