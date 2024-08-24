from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from astoneapp.models.product import Product 
from astoneapp.models.order import Order, OrderItem
from ..serializers.cart_serializer import OrderItemSerializer
from astoneapp.models.cart import Cart, CartItem

def get_cart(request):
    cart, created = Cart.objects.get_or_create(id=1)
    return cart

def save_cart(request, cart):
    request.session['cart'] = cart

@api_view(['POST'])
def place_order(request):
    cart = get_cart(request)
    if not cart:
        return Response({'message': 'Cart is empty'}, status=400)
    order = Order.objects.create(user=request.user, total_price=0)
    total_price = 0
    for item_key, item in cart.items():
        product_id, size, color = item_key.split('_')
        product = get_object_or_404(Product, id=product_id)
        OrderItem.objects.create(
            order=order,
            product=product,
            size=size,
            color=color,
            quantity=item['quantity'],
            price=product.price
        )
        total_price += product.price * item['quantity']
    order.total_price = total_price
    order.save()
    request.session['cart'] = {}
    return Response({'message': 'Order placed', 'order_id': order.id})


@api_view(['GET'])
def order_detail(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    items = order.orderitem_set.all()
    serializer = OrderItemSerializer(items, many=True)
    return Response({'order_items': serializer.data, 'total_price': order.total_price})
