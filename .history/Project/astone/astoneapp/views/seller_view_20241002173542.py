from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from astoneapp.models.seller import *
from rest_framework.response import Response
from astoneapp.serializers.seller_serializer import *
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.http import Http404
from django.core.mail import send_mail

class SellerTokenObtainPairView(TokenObtainPairView):
    serializer_class = SellerTokenObtainPairSerializer

class SellerRegisterView(generics.CreateAPIView):
    queryset = User.objects.all() # make sure do not create existing user
    serializer_class = SellerSerializer
    permission_classes = [AllowAny] # allow anyone to create a  

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data = {'message': 'Seller created successfully'}
        return response
    
class SellerGetView(APIView):     
    def get(self, request, pk):
            seller = Seller.objects.get(pk=pk)
            serializer = SellerSerializer(seller)
            return Response(serializer.data)
    
    def put(self, request, pk):
        seller = get_object_or_404(Seller, pk=pk)
        serializer = SellerSerializer(seller, data=request.data, partial=True)
        shop_name = request.data.get('shop_name')
        if shop_name and Seller.objects.filter(shop_name=shop_name).exclude(pk=pk).exists():
            return Response({'shop_name': 'A seller with this shop name already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Seller updated successfully'}, status=status.HTTP_200_OK)
        print('Serializer errors:', serializer.errors)  # Add this line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        seller = get_object_or_404(Seller, pk=pk)
        serializer = SellerSerializer(seller, data=request.data, partial=True)
        shop_name = request.data.get('shop_name')
        if shop_name and Seller.objects.filter(shop_name=shop_name).exclude(pk=pk).exists():
            return Response({'shop_name': 'A seller with this shop name already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Seller partially updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SellerForgotPassword(generics.CreateAPIView):
        serializer_class = SellerForgotPasswordSerializer

        def create(self, request, *args, **kwargs):
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            email = serializer.validated_data['email']
            # Verify if seller exists with the given email
            seller = User.objects.filter(email=email).first()
            if seller:
                 link = f"http://localhost:3000/sellerChangePassword/{seller.id}/"
                 send_mail(
                    subject='Verify Account',
                    message='Please verify your account',
                    from_email='astoneecommerce3170@gmail.com',
                    recipient_list=[email],
                    fail_silently=False,
                    html_message=f"<p>To change your password, click on this link: </p><p>{link}</p>"
                 )

                 return Response({'bool': True, 'msg': 'Please check your email'}, status=status.HTTP_200_OK)
            else:
                 return Response({'bool': False, 'msg': 'Invalid email'}, status=status.HTTP_400_BAD_REQUEST)
        
class SellerChangePassword(generics.UpdateAPIView):
    serializer_class = SellerChangePasswordSerializer
    lookup_field = 'user_id'

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        user = User.objects.filter(id=user_id).first()
        if not user:
            raise Http404("User not found")
        return user

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        password = serializer.validated_data['password']
        user.set_password(password)  # Use set_password to hash the password
        user.save()
        return Response({'bool': True, 'msg': 'Password has been changed'}, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        return self.put(request, *args, **kwargs)  # Handle PATCH the same as PUT