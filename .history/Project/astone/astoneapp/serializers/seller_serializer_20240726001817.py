from rest_framework import serializers
from astoneapp.models.seller import Seller

# Serializer serialize model instances into json objects for response
class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = '__all__'
        # Only accept password, but not returning the password
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        seller = Seller.objects.create_user