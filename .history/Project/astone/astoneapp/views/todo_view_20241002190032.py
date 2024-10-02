# views.py
from rest_framework.response import Response
from rest_framework.decorators import api_view
from astoneapp.models import Seller
from rest_framework import status

@api_view(['GET'])
def get_todo_view(request, seller_id):
    try:
        seller = Seller.objects.get(id=seller_id)
        return Response(seller.todo, status=status.HTTP_200_OK)
    except Seller.DoesNotExist:
        return Response({"error": "Seller not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
def update_todo_view(request, seller_id):
    try:
        seller = Seller.objects.get(id=seller_id)
        # Assuming the request contains the 'to_processed_shipment' field to update
        todo_update = request.data.get('todo', {})
        
        if 'to_processed_shipment' in todo_update:
            seller.todo['to_processed_shipment'] = todo_update['to_processed_shipment']
            seller.save()

        return Response(seller.todo, status=status.HTTP_200_OK)
    except Seller.DoesNotExist:
        return Response({"error": "Seller not found"}, status=status.HTTP_404_NOT_FOUND)
