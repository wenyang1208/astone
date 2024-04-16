from django.shortcuts import render
import json
from rest_framework.decorators import api_view
from astoneapp.models.product import Product # import model
from rest_framework.response import Response
from astoneapp.serializer.product_serializer import * # import serializer

@api_view(['GET', 'POST', 'PUT']) # request types
def GetCreateUpdateProductView(request):
    print(request.data)
    if request.method == 'POST':
        # Get by id
        if 'id' in request:
            _pk = request.get('id', '')
            try:
                product_instance = Product.objects.get(pk=_pk)
                serializer = ProductSerializer(data=product_instance)
                
                return Response(serializer.data, status=200)
            
            except Exception as e:
                print(e)
                return Response('Error fetching product', status=404)

        # Create
        else:
            try:
                name = request.get('name')
                currency = request.get('currency')
                price = request.get('price')
                quantity = request.get('quantity')
                    
                product = Product.create_product(name, currency, price, quantity)
                
                serializer = ProductSerializer(data=product)
            
                return Response(serializer.data, status=200)
            
            except Exception as e:
                return Response('Error creating product', status=404)
    
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
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
