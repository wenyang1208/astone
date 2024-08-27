from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.views import APIView
from astoneapp.models.seller import Seller # import model
from rest_framework.response import Response
from astoneapp.serializers.seller_serializer import * # import serializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all() # make sure do not create existing user
    serializer_class = SellerSerializer
    permission_classes = [AllowAny] # allow anyone to create a new user