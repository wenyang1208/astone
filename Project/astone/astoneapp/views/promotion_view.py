from rest_framework import viewsets
from astoneapp.models.promotion import Promotion
from astoneapp.serializers.promotion_serializer import PromotionSerializer
from rest_framework import status, generics
from rest_framework.exceptions import NotFound

class PromotionListCreate(generics.ListCreateAPIView):
    serializer_class = PromotionSerializer

    def get_queryset(self):
        product_id = self.request.query_params.get('product')
        return Promotion.objects.filter(product=product_id)

    def perform_create(self, serializer):
        if serializer.is_valid():
            product_id = self.request.data.get('product')
            serializer.save(product_id=product_id)
        else:
            print(serializer.errors)

class PromotionDelete(generics.DestroyAPIView):

    serializer_class = PromotionSerializer

    def get_object(self):
        promotion_id = self.kwargs.get('promotion_id')
        try:
            return Promotion.objects.get(id=promotion_id)
        except Promotion.DoesNotExist:
            raise NotFound(detail="No Promotion matches the given query.")
    
    def perform_destroy(self, instance):
        instance.delete()