import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button, Grid, Paper } from '@mui/material';
import { SellerService } from '../../services/SellerService';
import SellerSidebar from '../../components/sellerSidebar';
import SellerHeader from '../../components/sellerHeader';
import { ACCESS_TOKEN } from '../../constant';
import { jwtDecode } from 'jwt-decode';

const Shipment = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const sellerService = new SellerService();
  const token = localStorage.getItem(ACCESS_TOKEN);
  const sellerId = jwtDecode(token).seller_id;

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  const fetchSellerOrders = async () => {
    try {
      const response = await sellerService.getSellerOrders(sellerId);
      setOrders(response);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleShipment = async (orderId) => {
    try {
      await sellerService.incrementShipment(sellerId, { order_id: orderId });
      // Remove the processed order from the state
      setOrders(prevOrders => prevOrders.filter(order => order.order_id !== orderId));
      
      // Update the dashboard data
      try {
        const dashboardData = await sellerService.getSellerById(sellerId);
        const updatedTodo = dashboardData.data.todo;
        console.log(updatedTodo);
        updatedTodo.to_processed_shipment -= 1;
        updatedTodo.processed_shipment += 1;

            await sellerService.incrementShipment(sellerId, {
              to_processed_shipment: toProcessedShipment,
            });
      } catch (error) {
        console.error('Failed to update dashboard data:', error);
      }
    } catch (error) {
      console.error('Failed to process shipment:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SellerHeader sx={{ position: 'fixed', zIndex: 1200 }} />
      <Grid container>
        <Grid item xs={1.5}>
          <SellerSidebar />
        </Grid>
        <Grid item xs sx={{ backgroundColor: '#f5f5f5' }}>
          <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, fontSize: 30, mb: 2 }}>
                Orders to Ship
              </Typography>
              <List>
                {orders.map((order) => (
                  <ListItem key={order.order_id} divider>
                    <ListItemText
                      primary={`Product: ${order.product_name}`}
                      secondary={`Order ID: ${order.order_id} | Quantity: ${order.quantity} | Price: ${order.price}`}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleShipment(order.order_id)}
                    >
                      Process Shipment
                    </Button>
                  </ListItem>
                ))}
              </List>
              {orders.length === 0 && (
                <Typography>No orders to ship at the moment.</Typography>
              )}
              <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
                Back to Dashboard
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Shipment;