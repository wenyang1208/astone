from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from ..models.user import CustomUser
from ..serializers.user_serializer import UserSerializer
from django.contrib.auth import authenticate, login as django_login
from django.contrib.auth.hashers import make_password, check_password

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

    # user = CustomUser.objects.create(email=email, first_name=first_name, last_name=last_name, gender=gender, phone_number=phone_number, address=address, password=password)
    user = CustomUser.objects.create(email=email, first_name=first_name, last_name=last_name, gender=gender, phone_number=phone_number, address=address, password=make_password(password))
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'detail': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    # print(CustomUser.objects.get(email=email), CustomUser.objects.get(email=email).password)
    # print(email, password)

    # user = authenticate(email=email, password=password)
    # if user is not None:
    #     django_login(request, user)
    #     return Response({'detail': 'Login successful!'})
    # return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        user = CustomUser.objects.get(email=email)
        print(user.password)
    except CustomUser.DoesNotExist:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    if check_password(password, user.password):
        return Response({'detail': 'Login successful!'})
    else:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_user_details(request, email):
    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['PUT'])
def update_user_details(request, email):
    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)