from django.shortcuts import get_object_or_404, render
import json
from django.db import transaction
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, permissions
from rest_framework.views import APIView
from astoneapp.models.product import Product # import model
from astoneapp.models.image import Image # import model
from rest_framework.response import Response
from astoneapp.serializers.product_serializer import * # import serializer
import logging

logger = logging.getLogger(__name__)

# @api_view(['GET', 'POST', 'PUT']) # request types
# def GetCreateUpdateProductView(request):
#     print(request.data)
#     if request.method == 'POST':
#         # Get by id
#         if 'id' in request:
#             _pk = request.get('id', '')
#             try:
#                 product_instance = Product.objects.get(pk=_pk)
#                 serializer = ProductSerializer(data=product_instance)
                
#                 return Response(serializer.data, status=200)
            
#             except Exception as e:
#                 print(e)
#                 return Response('Error fetching product', status=404)

#         # Create
#         else:
#             try:
#                 name = request.get('name')
#                 currency = request.get('currency')
#                 price = request.get('price')
#                 quantity = request.get('quantity')
                    
#                 product = Product.create_product(name, currency, price, quantity)
                
#                 serializer = ProductSerializer(data=product)
            
#                 return Response(serializer.data, status=200)
            
#             except Exception as e:
#                 return Response('Error creating product', status=404)

# Added by Wen Yang, this is the class of the ProductView for urls used, can connect to the admin
# class ProductView(APIView):
    
#     def get(self, request):
#         output = [{"name": output.name,
#                     "description": output.description,
#                     "category": output.category,
#                     "colors":output.colors,
#                     "sizes": output.sizes,
#                     "currency": output.currency,
#                     "price": output.price,
#                     "stock":output.stock}
#                     for output in Product.objects.all()]
#         return Response(output)  
       
#     def post(self, request):
#             serializer = ProductSerializer(data=request.data)
#             if serializer.is_valid(raise_exception=True):
#                     serializer.save()
#                     return Response(serializer.data)

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
                rating=rating
            )
            print(images)

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
                
                # Handle images
                images = request.FILES.getlist('images')
                if images:
                    # Clear existing images if needed
                    product.images.all().delete()
                    
                    # Add new images
                    for image in images:
                        Image.objects.create(product=product, image_url=image)
                
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)