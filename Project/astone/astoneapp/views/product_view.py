from django.shortcuts import get_object_or_404, render
import json
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework import status, generics
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, permissions
from rest_framework.views import APIView
from astoneapp.models.product import Product # import model
from astoneapp.models.image import Image # import model
from rest_framework.response import Response
from astoneapp.serializers.product_serializer import * # import serializer
from rest_framework.permissions import IsAuthenticated, AllowAny
import jwt
import logging

logger = logging.getLogger(__name__)

# @api_view(['GET']) # request type    
# def GetProductView(request):
#     if request.method == 'PUT':
#         pk = request.data.get('id', '')
#         try:
#             name = request.get('name')
#             currency = request.get('currency')
#             price = request.get('price')
#             quantity = request.get('quantity')
#             rating = request.get('rating')
#             product_instance, changes = product_instance.update(name, currency, price, quantity)

#             return Response(f"Product updated successfully with changes: {changes}")
                
#         except Exception:
#             return Response(f"Product with id {pk} does not exist", status=404)
#     products = Product.objects.all()
#     serializer = ProductSerializer(products, many=True)
#     return Response(serializer.data)
            

class ProductListCreate(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    def get_queryset(self):
        user_id = self.request.user.seller
        return Product.objects.filter(seller=user_id).prefetch_related('images')

    def perform_create(self, serializer):
        if serializer.is_valid():
            # Access the user_id directly from the AccessToken object
            user_id = self.request.user.seller.id
            product = serializer.save(seller_id=user_id)  # Save using user_id
            images = self.request.FILES.getlist('images')
            for image in images:
                Image.objects.create(product=product, image_url=image)
        else:
            print(serializer.errors)


@api_view(['GET'])
def GetProductView(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
            

@api_view(['POST']) # request type
@parser_classes([MultiPartParser, FormParser])
def CreateProductView(request):
    try:
        with transaction.atomic():
            print("data")
            print(request.data)
            print("files")
            print(request.FILES)
            # Create product
            name = request.data.get('name')
            description = request.data.get('description')
            category = request.data.get('category')
            colors = request.data.get('colors')
            sizes = request.data.get('sizes')
            currency = request.data.get('currency')
            price = request.data.get('price')
            stock = request.data.get('stock')
            rating = request.data.get('rating')
            brand = request.data.get('brand')
            gender = request.data.get('gender')

            images = request.FILES.getlist('images')

            # Validate request
            if not all([name, description, currency, price]):
                return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

            product = Product.objects.create(
                name=name,
                description=description,
                category=category,
                colors=colors,
                sizes=sizes,
                currency=currency,
                price=price,
                stock=stock,
                rating=rating,
                brand=brand,
                gender=gender
            )

            # Create product images
            for image in images:
                print(image)
                Image.objects.create(product=product, image_url=image)

            serializer = ProductCreateResponseSerializer({'message': 'Product created successfully'})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
class ProductDetailView(APIView):
    
    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
       
    def delete(self, request,pk):
        product = get_object_or_404(Product, pk=pk)
        product.delete()
        return Response(status=status.HTTP_200_OK)

@api_view(['PUT', 'PATCH', 'GET'])
def UpdateProductView(request, pk):
    try:
        product = get_object_or_404(Product, pk=pk)
        
        if request.method == 'GET':
            serializer = ProductSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        if request.method in ['PUT', 'PATCH']:
            serializer = ProductSerializer(product, data=request.data, partial=(request.method == 'PATCH'))
            
            if serializer.is_valid():
                serializer.save()
                
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)