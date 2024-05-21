from django.shortcuts import render
import json
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework import status
from astoneapp.models.product import Product # import model
from astoneapp.models.product_to_image import ProductToImage # import model
from rest_framework.response import Response
from astoneapp.serializers.product_serializer import * # import serializer

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

@api_view(['GET']) # request type    
def GetProductView(request):
            products = Product.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        
#     if request.method == 'PUT':
#         pk = request.data.get('id', '')
#         try:
#             name = request.get('name')
#             currency = request.get('currency')
#             price = request.get('price')
#             quantity = request.get('quantity')
            
#             product_instance, changes = product_instance.update(name, currency, price, quantity)

#             return Response(f"Product updated successfully with changes: {changes}")
                
#         except Exception:
#             return Response(f"Product with id {pk} does not exist", status=404)


@api_view(['POST']) # request type
def CreateProductView(request):
    try:
        with transaction.atomic():
            # Create product
            name = request.data.get('name')
            description = request.data.get('description')
            colors = request.data.get('colors')
            sizes = request.data.get('sizes')
            currency = request.data.get('currency')
            price = request.data.get('price')
            stock = request.data.get('stock')
            
            key = request.data.get('public_id')
            url = request.data.get('secure_url')
            width = request.data.get('width')
            height = request.data.get('height')
            format = request.data.get('format')
            file_name = request.data.get('original_filename')

            # Validate request
            if not all([name, description, currency, price, key, url, width, height, format, file_name]):
                return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

            product = Product.objects.create(
                name=name,
                description=description,
                colors=colors,
                sizes=sizes,
                currency=currency,
                price=price,
                stock=stock
            )    
            
            # Create product image
            product.add_image(
                key=key, 
                url=url, 
                name=file_name, 
                width=width, 
                height=height, 
                format=format)

            serializer = ProductCreateResponseSerializer({'message': 'Product created successfully'})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @api_view(['POST']) # request type
# def UpdateProductView(request):
#     # Create product
@api_view(['GET']) # request type    
def GetProductImagesView(request):
            product_images = ProductToImage.objects.all()
            serializer = ProductImageSerializer(product_images, many=True)
            return Response(serializer.data)   
    
    
#     # Create product image
#     body = request.body.decode('utf-8')
#     data = json.loads(body)

# @api_view(['POST'])
# def SearchProductView(request):
