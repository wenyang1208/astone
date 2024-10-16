from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from astoneapp.models.seller import Seller 
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

@api_view(['PATCH'])
def update_order_seller(request, order_id):
    try:
        order = get_object_or_404(Order, id=order_id)
        seller_id = request.data.get('seller')

        if not seller_id:
            return Response({'error': 'Seller data is required for updating'}, status=status.HTTP_400_BAD_REQUEST)

        seller = get_object_or_404(Seller, id=seller_id)

        # Update the seller for all OrderItems in this order
        order_items = OrderItem.objects.filter(order=order)
        with transaction.atomic():
            for item in order_items:
                item.seller = seller
                item.save()

        serializer = OrderSerializer(order)
        return Response({'message': 'Seller updated successfully', 'order': serializer.data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



