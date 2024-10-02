from rest_framework import viewsets
from astoneapp.models.promotion import Promotion
from astoneapp.serializers.promotion_serializer import PromotionSerializer
from rest_framework import status, generics
from rest_framework.exceptions import NotFound