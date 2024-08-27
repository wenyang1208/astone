from rest_framework import serializers
from django.contrib.auth.models import User
from astoneapp.models.seller import Seller

# Use User as the Django contains user authentication features
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class SellerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Seller
        # Specific fields that are not included in the user auth features
        fields = ['user', 'gender', 'phone_number', 'address']

    def create(self, validated_data):
        # Extract nested data for the User model (first name, last name, ...)
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        seller, created = Seller.objects.update_or_create(user=user, gender=validated_data.pop('gender'), phone_number=validated_data.pop('phone_number'), address=validated_data.pop('address'))
        return seller
