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

@api_view(['POST']) # request type
def RegisterView(request):
    try:
        with transaction.atomic():
            queryset = User.objects.all() # make sure do not create existing user
            serializer_class = SellerSerializer
            permission_classes = [AllowAny] # allow anyone to create a new user
            seller = Seller.objects.create(
                username=request.data.get('username'),
                first_name=request.data.get('first_name'),
                last_name=request.data.get('last_name'),
                password=request.data.get('password'),
                email=request.data.get('password'),
                currency=currency,
                price=price,
                stock=stock,
                rating=rating
            )    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)