from rest_framework import serializers
from django.contrib.auth.models import User
from astoneapp.models.seller import Seller
from astoneapp.models.todo import Todo
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['image_url']

class SellerTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        try:
            seller = Seller.objects.get(user=user)
            token['seller_id'] = seller.id
        except Seller.DoesNotExist:
            token['seller_id'] = None

        return token
    
# Use User as the Django contains user authentication features
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'password', 'email', 'date_joined']
        # Only accept password, but not returning the password
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class SellerSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Seller
        # Specific fields that are not included in the user auth features
        fields = ['user', 'gender', 'phone_number', 'address', 'shop_name']

    def create(self, validated_data):
        # Extract nested data for the User model (first name, last name, ...)
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        seller = Seller.objects.create(
            user=user,
            gender=validated_data['gender'],
            phone_number=validated_data['phone_number'],
            address=validated_data['address'],
            shop_name=validated_data['shop_name'],
        )
        return seller
    
class SellerForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        # Ensure that the email exists in the Seller model
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Invalid email address")
        return value
    
class SellerChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)

class SellerResponseSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)
