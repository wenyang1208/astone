from rest_framework import serializers
from astoneapp.models.product import Product
from astoneapp.models.product_to_image import ProductToImage

# Serializer serialize model instances into json objects for response
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        # fields = ['name','description','category','colors','sizes','currency','price']

class ProductCreateResponseSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductToImage
        fields = '__all__'