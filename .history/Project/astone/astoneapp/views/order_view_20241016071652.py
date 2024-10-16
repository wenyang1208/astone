from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from astoneapp.models.product import Product 
from astoneapp.models.order import Order, OrderItem
from ..serializers.cart_serializer import OrderItemSerializer
from astoneapp.models.cart import Cart, CartItem
from rest_framework import status

def get_cart():
    cart, created = Cart.objects.get_or_create(id=1)
    return cart

def save_cart(request, cart):
    request.session['cart'] = cart

@api_view(['POST'])
def place_order(request):
    cart = get_cart()
    if not cart:
        return Response({'message': 'Cart is empty'}, status=400)
    print(request.data)
    
    address = request.data.get('address')    
    print(address)

    if not address:
        return Response({'message': 'Address is required'}, status=400)
    
    order = Order.objects.create(total_price=0, address=address)
    total_price = 0
    cart_items = CartItem.objects.filter(cart=cart)
    
    for item in cart_items:
        product = item.product
        OrderItem.objects.create(
            order=order,
            product=product,
            size=item.size,
            color=item.color,
            quantity=item.quantity,
            price=product.price
        )
        total_price += product.price * item.quantity
        item.delete()  # Remove the item from the cart
    
    order.total_price = total_price
    order.save()
    return Response({'message': 'Order placed', 'order_id': order.id})

@api_view(['GET'])
def order_detail(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    items = order.orderitem_set.all()
    serializer = OrderItemSerializer(items, many=True)
    return Response({'order_items': serializer.data, 'total_price': order.total_price, 'address': order.address})

@api_view(['PUT', 'PATCH', 'GET'])
def update_order_detail(request, order_id):
    try:
        # Get the Order object
        order = get_object_or_404(Order, id=order_id)
        
        # Handle GET request: Fetch order items
        if request.method == 'GET':
            items = order.orderitem_set.all()
            serializer = OrderItemSerializer(items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # Handle PUT or PATCH requests: Update the order or order items
        if request.method in ['PUT', 'PATCH']:
            # Here we assume you want to update individual order items
            # Request should contain an 'items' field with the order items data
            items_data = request.data.get('items')

            if not items_data:
                return Response({'error': 'Items data is required for updating'}, status=status.HTTP_400_BAD_REQUEST)

            # Iterate over the items and update each one
            for item_data in items_data:
                order_item_id = item_data.get('id')
                if not order_item_id:
                    continue
                
                # Fetch the specific order item
                order_item = get_object_or_404(OrderItem, id=order_item_id, order=order)
                
                # Update this order item
                serializer = OrderItemSerializer(order_item, data=item_data, partial=(request.method == 'PATCH'))
                if serializer.is_valid():
                    serializer.save()
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({'message': 'Order items updated successfully'}, status=status.HTTP_200_OK)

        # If the request method is not allowed
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

