from rest_framework import serializers
from django.contrib.auth.models import User
from astoneapp.models.seller import Seller

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

# Serializer serialize model instances into json objects for response
class SellerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Seller
        fields = '__all__'
        # Only accept password, but not returning the password
        extra_kwargs = {'password': {'write_only': True}}
