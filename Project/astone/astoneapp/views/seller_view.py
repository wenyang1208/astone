from django.shortcuts import get_object_or_404
from rest_framework import status
from django.db import transaction
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from astoneapp.models.seller import *
from rest_framework.response import Response
from astoneapp.serializers.seller_serializer import SellerSerializer, SellerTokenObtainPairSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

class SellerTokenObtainPairView(TokenObtainPairView):
    serializer_class = SellerTokenObtainPairSerializer

class SellerRegisterView(generics.CreateAPIView):
    queryset = User.objects.all() # make sure do not create existing user
    serializer_class = SellerSerializer
    permission_classes = [AllowAny] # allow anyone to create a  

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data = {'message': 'Seller created successfully'}
        return response
    
class SellerGetView(APIView):     
    def get(self, request, pk):
            seller = Seller.objects.get(pk=pk)
            serializer = SellerSerializer(seller)
            return Response(serializer.data)
    
    def put(self, request, pk):
        seller = get_object_or_404(Seller, pk=pk)
        serializer = SellerSerializer(seller, data=request.data, partial=True)
        shop_name = request.data.get('shop_name')
        if shop_name and Seller.objects.filter(shop_name=shop_name).exclude(pk=pk).exists():
            return Response({'shop_name': 'A seller with this shop name already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Seller updated successfully'}, status=status.HTTP_200_OK)
        print('Serializer errors:', serializer.errors)  # Add this line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        seller = get_object_or_404(Seller, pk=pk)
        serializer = SellerSerializer(seller, data=request.data, partial=True)
        shop_name = request.data.get('shop_name')
        if shop_name and Seller.objects.filter(shop_name=shop_name).exclude(pk=pk).exists():
            return Response({'shop_name': 'A seller with this shop name already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Seller partially updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

