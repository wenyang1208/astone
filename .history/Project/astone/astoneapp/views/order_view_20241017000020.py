from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction
from astoneapp.models.seller import Seller 
from astoneapp.models.order import Order, OrderItem
from ..serializers.cart_serializer import OrderItemSerializer
from astoneapp.models.cart import Cart, CartItem
from rest_framework import status
from decimal import Decimal
from astoneapp.models.user import CustomUser 

def get_user_by_email(email):
    return get_object_or_404(CustomUser, email=email)

def get_single_cart(user):
    cart = Cart.objects.filter(user=user).first()
    if not cart:
        cart = Cart.objects.create(user=user)

    return cart

def save_cart(request, cart):
    request.session['cart'] = cart

@api_view(['POST'])
def place_order(request):
    email = request.data.get('email')
    user = get_user_by_email(email)
    cart = get_single_cart(user)
    if not cart:
        return Response({'message': 'Cart is empty'}, status=400)
    address = request.data.get('address')

    if not address:
        return Response({'message': 'Address is required'}, status=400)
    
    points_to_use = int(request.data.get('points_to_use', 0))
    if points_to_use > user.points:
        return Response({'message': 'Insufficient points'}, status=400)
    
    order = Order.objects.create(total_price=Decimal('0.00'), address=address, user=user)
    total_price = Decimal('0.00')

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

    # Apply discount using points
    discount = Decimal(points_to_use)
    total_price -= discount
    if total_price < 0:
        total_price = Decimal('0.00')
    

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
def update_order_seller(request, order_item_id):
    try:
        order_item = get_object_or_404(OrderItem, id=order_item_id)
        seller_id = request.data.get('seller')

        if not seller_id:
            return Response({'error': 'Seller data is required for updating'}, status=status.HTTP_400_BAD_REQUEST)

        seller = get_object_or_404(Seller, id=seller_id)

        with transaction.atomic():
            order_item.seller = seller
            order_item.save()

        return Response({'message': 'Seller updated successfully'}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


