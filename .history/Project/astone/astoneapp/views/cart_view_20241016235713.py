from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from astoneapp.models.product import Product
from astoneapp.models.cart import Cart, CartItem
from astoneapp.serializers.product_serializer import ProductSerializer
from astoneapp.models.user import CustomUser

def get_user_by_email(email):
    print(email)
    return get_object_or_404(CustomUser, email=email)

def get_single_cart(user):
    cart = Cart.objects.filter(user=user).first()
    if not cart:
        cart = Cart.objects.create(user=user)
    return cart

@api_view(['POST'])
def add_to_cart(request, product_id):
    email = request.data.get('email')
    user = get_user_by_email(email)
    product = get_object_or_404(Product, id=product_id)
    cart = get_single_cart(user)
    size = request.data.get('size')
    color = request.data.get('color')

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

@api_view(['POST'])
def update_cart_item(request, product_id):
    email = request.data.get('email')
    user = get_user_by_email(email)
    product = get_object_or_404(Product, id=product_id)
    cart = get_single_cart(user)
    size = request.data.get('size')
    color = request.data.get('color')
    quantity = request.data.get('quantity')

    try:
        quantity = int(quantity)  # Convert quantity to integer
        cart_item = CartItem.objects.get(cart=cart, product=product, size=size, color=color)
        if quantity > 0:
            cart_item.quantity = quantity
            cart_item.save()
            message = 'Item quantity updated'
        else:
            cart_item.delete()
            message = 'Item removed from cart'
    except CartItem.DoesNotExist:
        return Response({'message': 'Item not found in cart'}, status=404)
    except ValueError:
        return Response({'message': 'Invalid quantity value'}, status=400)

    return Response({'message': message})

@api_view(['GET'])
def cart_detail(request):
    cart = get_single_cart()
    cart_items = CartItem.objects.filter(cart=cart)
    total_price = sum(item.product.price * item.quantity for item in cart_items)
    
    cart_items_data = [
        {
            'product_id': item.product.id,
            'product': ProductSerializer(item.product).data,
            'size': item.size,
            'color': item.color,
            'quantity': item.quantity,
            'price': item.product.price,
            'total_price': item.product.price * item.quantity
        }
        for item in cart_items
    ]
    
    return Response({'cart_items': cart_items_data, 'total_price': total_price})