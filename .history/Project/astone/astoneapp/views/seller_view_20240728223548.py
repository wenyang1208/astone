from django.shortcuts import get_object_or_404, render
from rest_framework import status
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from astoneapp.models.seller import Seller # import model
from rest_framework.response import Response
from astoneapp.serializers.seller_serializer import * # import serializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User

# class RegisterView(generics.CreateAPIView):
#     try:
#         queryset = User.objects.all() # make sure do not create existing user
#         serializer_class = SellerSerializer
#         permission_classes = [AllowAny] # allow anyone to create a new user
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST']) # request type
def RegisterView(request):
    try:
        with transaction.atomic():
            queryset = User.objects.all() # make sure do not create existing user
            serializer_class = SellerSerializer
            permission_classes = [AllowAny] # allow anyone to create a new user
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)