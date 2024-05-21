from rest_framework import serializers
from astoneapp.models.product import Product

# Serializer serialize model instances into json objects for response
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        # fields = ['name','description','category','colors','sizes','currency','price']

class ProductCreateResponseSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)