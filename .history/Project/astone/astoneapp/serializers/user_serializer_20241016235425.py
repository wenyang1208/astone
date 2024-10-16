from rest_framework import serializers
from ..models.user import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'gender', 'phone_number', 'address', 'points']

class UserForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Invalid email address")
        return value
    
class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)
