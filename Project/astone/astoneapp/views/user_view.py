from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models.user import CustomUser
from ..serializers.user_serializer import UserSerializer
from django.contrib.auth import authenticate, login as django_login

@api_view(['POST'])
def register_user(request):
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    gender = request.data.get('gender')
    phone_number = request.data.get('phone_number')
    address = request.data.get('address')
    password = request.data.get('password')

    if not email or not password:
        return Response({'detail': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if CustomUser.objects.filter(email=email).exists():
        return Response({'detail': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.create(email=email, first_name=first_name, last_name=last_name, gender=gender, phone_number=phone_number, address=address, password=password)
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'detail': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if user is not None:
        django_login(request, user)
        return Response({'detail': 'Login successful!'})
    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_user_details(request, user_id):
    try:
        user = CustomUser.objects.get(pk=user_id)
    except CustomUser.DoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user)
    return Response(serializer.data)