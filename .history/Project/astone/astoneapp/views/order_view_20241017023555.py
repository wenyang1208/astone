from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from astoneapp.models.product import Product 
from astoneapp.models.order import Order, OrderItem
from ..serializers.cart_serializer import OrderItemSerializer
from astoneapp.models.cart import Cart, CartItem
from rest_framework import status

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
    
    # Deduct used points
    user.points -= points_to_use
    
    # Calculate cashback (10% of total price)
    cashback = total_price * Decimal('0.10')
    
    # Update user's points with cashback
    user.points += int(cashback)
    user.save()
    
    return Response({'message': 'Order placed', 'order_id': order.id, 'cashback': cashback})


@api_view(['GET'])
def order_detail(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    items = order.orderitem_set.all()
    serializer = OrderItemSerializer(items, many=True)
    return Response({'order_items': serializer.data, 'total_price': order.total_price, 'address': order.address})

