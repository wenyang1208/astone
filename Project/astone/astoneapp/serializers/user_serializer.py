from rest_framework import serializers
from ..models.user import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'address', 'phone_number', 'date_of_birth']