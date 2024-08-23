from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from astoneapp.models.product import Product
from astoneapp.models.cart import Cart, CartItem

def get_single_cart():
    cart, created = Cart.objects.get_or_create(id=1)
    return cart

@api_view(['POST'])
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    cart = get_single_cart()
    size = request.data.get('size')
    color = request.data.get('color')
    item_key = f"{product_id}_{size}_{color}"

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        size=size,
        color=color,
        defaults={'quantity': 1}
    )
    if not created:
        cart_item.quantity += 1
        cart_item.save()

    return Response({'message': 'Item added to cart'})

@api_view(['GET'])
def cart_detail(request):
    cart = get_single_cart()
    cart_items = CartItem.objects.filter(cart=cart)
    total_price = sum(item.product.price * item.quantity for item in cart_items)
    cart_items_data = [
        {
            'product': item.product.name,
            'size': item.size,
            'color': item.color,
            'quantity': item.quantity,
            'price': item.product.price,
            'total_price': item.product.price * item.quantity
        }
        for item in cart_items
    ]
    return Response({'cart_items': cart_items_data, 'total_price': total_price})