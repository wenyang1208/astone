from django.shortcuts import get_object_or_404, render
import json
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from astoneapp.models.product import Product # import model
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

@api_view(['GET']) # request type    
def GetProductView(request):
    if request.method == 'PUT':
        pk = request.data.get('id', '')
        try:
            name = request.get('name')
            currency = request.get('currency')
            price = request.get('price')
            quantity = request.get('quantity')
            
            product_instance, changes = product_instance.update(name, currency, price, quantity)

            return Response(f"Product updated successfully with changes: {changes}")
                
        except Exception:
            return Response(f"Product with id {pk} does not exist", status=404)
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
            
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
            rating = request.data.get('rating')
            
            # key = request.data.get('public_id')
            # url = request.data.get('secure_url')
            # width = request.data.get('width')
            # height = request.data.get('height')
            # format = request.data.get('format')
            # file_name = request.data.get('original_filename')

            # Validate request
            # if not all([name, description, currency, price, key, url, width, height, format, file_name]):
            #     return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)
            if not all([name, description, currency, price]):
                return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

            product = Product.objects.create(
                name=name,
                description=description,
                colors=colors,
                sizes=sizes,
                currency=currency,
                price=price,
                stock=stock,
                rating=rating
            )    
            
            # Create product image
            # product.add_image(
            #     key=key, 
            #     url=url, 
            #     name=file_name, 
            #     width=width, 
            #     height=height, 
            #     format=format)

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
        if request.method == 'PUT':
            serializer = ProductSerializer(product, data=request.data)
        elif request.method == 'PATCH':
            serializer = ProductSerializer(product, data=request.data, partial=True)
        else:
            return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
