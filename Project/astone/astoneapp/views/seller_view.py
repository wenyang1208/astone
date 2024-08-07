from django.shortcuts import redirect
from rest_framework import status
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from astoneapp.models.seller import *
from rest_framework.response import Response
from astoneapp.serializers.seller_serializer import SellerSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

class SellerRegisterView(generics.CreateAPIView):
        queryset = User.objects.all() # make sure do not create existing user
        serializer_class = SellerSerializer
        permission_classes = [AllowAny] # allow anyone to create a  

        def create(self, request, *args, **kwargs):
                response = super().create(request, *args, **kwargs)
                response.data = {'message': 'Seller created successfully'}
                return response

