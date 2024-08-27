from rest_framework import serializers
from astoneapp.models.product import Product
from astoneapp.models.image import Image

# Serializer serialize model instances into json objects for response
class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'image_url']

class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        # fields = '__all__'
        fields = ['id', 'name','description','category','colors','sizes','currency','price', 'rating', 'stock', 'original_price', 'promotion_price','seller','images']
        extra_kwargs = {"seller": {"read_only": True}}

class ProductCreateResponseSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)

