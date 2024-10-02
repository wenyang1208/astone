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