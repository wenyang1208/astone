from django.db.models import F
from rest_framework.response import Response
from rest_framework import status
from astoneapp.models.todo import Todo
from rest_framework.decorators import api_view

@api_view(['POST'])
def increment_processed_shipment(request, seller_id):
    try:
        todo = Todo.objects.get(seller_id=seller_id)
        to_processed_shipment = request.data.get('to_processed_shipment', 0)
        
        # Increment the to_processed_shipment by the provided amount
        todo.to_processed_shipment = F('to_processed_shipment') + to_processed_shipment
        todo.save()
        todo.refresh_from_db()
        
        return Response({"success": True, "to_processed_shipment": todo.to_processed_shipment}, status=status.HTTP_200_OK)
    except Todo.DoesNotExist:
        return Response({"error": "Todo not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def increment_shipment(request, seller_id):
    try:
        todo = Todo.objects.get(seller_id=seller_id)
        processed_shipment = request.data.get('processed_shipment', 0)
        
        # Increment the to_processed_shipment by the provided amount
        todo.to_processed_shipment = F('to_processed_shipment') + processed_shipment
        todo.save()
        todo.refresh_from_db()
        
        return Response({"success": True, "to_processed_shipment": todo.to_processed_shipment}, status=status.HTTP_200_OK)
    except Todo.DoesNotExist:
        return Response({"error": "Todo not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
