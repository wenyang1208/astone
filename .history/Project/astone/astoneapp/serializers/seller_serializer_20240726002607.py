from rest_framework import serializers
from django.contrib.auth.models import User
from astoneapp.models.seller import Seller

# Use User as the Django contains user authentication features
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = 

class SellerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Seller
        # Specific fields that are not included in the user auth features
        fields = ['user', 'gender', 'phone_number', 'address']
        # Only accept password, but not returning the password
        extra_kwargs = {'password': {'write_only': True}}