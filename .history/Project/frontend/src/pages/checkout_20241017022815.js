import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OrderService } from '../services/OrderService';
import { UserService } from '../services/UserService';
import { SellerService } from '../services/SellerService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CheckoutPage() {
  const BASE_URL = 'https://astone-backend-app.onrender.com';
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryStatus, setDeliveryStatus] = useState('Processing');
  const deliveryTimeouts = useRef([]);

  const navigate = useNavigate();

  const fetchCartItems = async () => {
    const orderService = new OrderService();
    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
      console.error('User email not found. Please log in.');
      return;
    }

    try {
      const res = await orderService.getCart(userEmail);
      if (res && res.data) {
        setCartItems(res.data.cart_items);
        setTotalPrice(res.data.total_price.toFixed(2));
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    const orderService = new OrderService();
    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
      setError('User email not found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const res = await orderService.placeOrder(userEmail);
      if (res && res.data) {
        const orderId = res.data.order_id;
        const orderRes = await orderService.getOrderDetails(orderId, userEmail);
        if (orderRes && orderRes.data) {
          setOrderDetails(orderRes.data);
          simulateDelivery();
        }
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const simulateDelivery = () => {
    if (deliveryStatus !== 'Canceled') {
      deliveryTimeouts.current.push(setTimeout(() => setDeliveryStatus('Shipped'), 5000));
      deliveryTimeouts.current.push(setTimeout(() => setDeliveryStatus('Out for delivery'), 7000));
      deliveryTimeouts.current.push(setTimeout(() => setDeliveryStatus('Delivered'), 9000));
    }
  };

  const handleCancelOrder = () => {
    toast.info('Order canceled successfully!');
    setDeliveryStatus('Canceled');
    deliveryTimeouts.current.forEach(clearTimeout);
    deliveryTimeouts.current = [];
  };

  const getDeliveryIcon = () => {
    switch (deliveryStatus) {
      case 'Processing':
        return <HourglassBottomIcon fontSize="large" />;
      case 'Shipped':
        return <LocalShippingIcon fontSize="large" />;
      case 'Out for delivery':
        return <DeliveryDiningIcon fontSize="large" />;
      case 'Delivered':
        return <CheckCircleIcon fontSize="large" color="success" />;
      case 'Canceled':
        return <Typography color="error">Order Canceled</Typography>;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, mt: 4 }}>
        <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Checkout
        </Typography>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : orderDetails ? (
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Order ID: <span style={{ color: '#007bff' }}>{orderDetails.id}</span>
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Total Price: <span style={{ color: '#28a745' }}>MYR {orderDetails.total_price}</span>
          </Typography>
          <Box display="flex" alignItems="center" marginTop={2}>
            {getDeliveryIcon()}
            <Typography variant="body1" color={deliveryStatus === 'Delivered' ? 'green' : 'blue'} marginLeft={1}>
              Delivery Status: <strong>{deliveryStatus}</strong>
            </Typography>
          </Box>
          <Button variant="contained" color="secondary" onClick={handleCancelOrder} sx={{ mt: 2 }}>
            Cancel Order
          </Button>
        </Paper>
      ) : (
        <List>
          {cartItems.map((item, index) => {
            const imageUrl = item.product.default_image ? `${BASE_URL}${item.product.default_image}` : 'https://via.placeholder.com/140';

            return (
              <ListItem key={index}>
                <img src={imageUrl} alt={item.product.name} style={{ width: 50, height: 50, marginRight: 10 }} />
                <ListItemText
                  primary={`${item.product.name} - ${item.quantity} x MYR ${item.price}`}
                  secondary={`Total: MYR ${item.total_price.toFixed(2)}`}
                />
              </ListItem>
            );
          })}
        </List>
      )}
      <ToastContainer />
    </Container>
  );
}

export default CheckoutPage;
