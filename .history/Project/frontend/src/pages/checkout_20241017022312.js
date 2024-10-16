import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress, Box, TextField, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Paper, Grid, Divider, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OrderService } from '../services/OrderService';
import {ToastContainer, toast} from 'react-toastify';
import { SellerService } from '../services/SellerService';

function CheckoutPage() {
  const BASE_URL = 'https://astone-backend-app.onrender.com';
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

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

  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
    fetchUserPoints();
  }, []);

  useEffect(() => {
    setFinalPrice(parseFloat(usePoints ? totalPrice - discount : totalPrice));
  }, [totalPrice, discount, usePoints]);

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
      let finalTotalPrice = totalPrice;
      if (usePoints) {
        finalTotalPrice -= discount;
        await orderService.deductPoints(userEmail, discount);
      }

      const res = await orderService.placeOrder(address, userEmail);
      if (res && res.data) {
        const orderId = res.data.order_id;
        const sellerService = new SellerService();
        const orderRes = await orderService.getOrderDetails(orderId, userEmail);
        if (orderRes && orderRes.data) {
          for(let i = 0; i < orderRes.data.order_items.length; i++){
            const orderItem = orderRes.data.order_items[i];
            const sellerId = orderItem.product.seller;
            const toProcessedShipment = 1;
            await orderService.updateOrderDetails(orderItem.id, { seller: sellerId });
            await sellerService.incrementShipment(sellerId, {
              to_processed_shipment: toProcessedShipment,
            });
          }
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

  const deliveryTimeouts = useRef([]); // Create a ref to store timeouts

  const simulateDelivery = () => {
      if (deliveryStatus !== 'Canceled') {
          deliveryTimeouts.current.push(setTimeout(() => {
              setDeliveryStatus('Shipped');
          }, 5000));
      }

      if (deliveryStatus !== 'Canceled') {
          deliveryTimeouts.current.push(setTimeout(() => {
              setDeliveryStatus('Out for delivery');
          }, 7000));
      }

      if (deliveryStatus !== 'Canceled') {
          deliveryTimeouts.current.push(setTimeout(() => {
              setDeliveryStatus('Delivered');
          }, 9000));
      }
  };

  const handleCancelOrder = () => {
      toast.info('Order canceled successfully!');
      setDeliveryStatus('Canceled');
      deliveryTimeouts.current.forEach(clearTimeout); // Clear all timeouts
      deliveryTimeouts.current = []; // Reset the timeouts array
  };

  const handleReturnOrder = () => {
    toast.success('Product return process initiated!');
    setDeliveryStatus('Returned');
  };

  const handleOpenPayment = () => {
    setPaymentOpen(true);
  };

  const handleClosePayment = () => {
    setPaymentOpen(false);
  };

  const handlePayment = () => {
    setPaymentLoading(true);
    handlePlaceOrder();
    setTimeout(() => {
      setPaymentLoading(false);
      setPaymentOpen(false);
      alert('Payment successful!');
      // navigate('/order-confirmation', { state: { orderDetails } });
    }, 2000); // Simulate payment processing time
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
        <Box>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          <Typography variant="body1">
            Order ID: 447898787
          </Typography>
          <Typography variant="body1">
            Total Price: {'MYR' + orderDetails.total_price}
          </Typography>
          <Typography variant="body1">
            Address: {orderDetails.address}
          </Typography>
          {/* Add more order details as needed */}
        </Box>
      ) : (
        <Box>
          <List>
            {cartItems.map((item, index) => {
              const colors = item.product.colors;
              const sizes = item.product.sizes;
              const selectedColor = colors.find(color => color.code === item.color);
              const selectedSize = sizes.find(size => size.value === item.size);
              const imageUrl = item.product.default_image ? `${BASE_URL}${item.product.default_image}` : 'https://via.placeholder.com/140';

              return (
                <ListItem key={index}>
                  <img src={imageUrl} alt={item.product.name} style={{ width: 50, height: 50, marginRight: 10 }} />
                  <ListItemText
                    primary={`${item.product.name} - ${item.quantity} x MYR ${item.price}`}
                    secondary={`Total: MYR ${item.total_price.toFixed(2)}`}
                  />
                  {selectedColor && (
                    <Box style={{ backgroundColor: selectedColor.code, width: '20px', height: '20px', marginRight: '5px' }} />
                  )}
                  {selectedSize && (
                    <Typography variant="body2" sx={{ marginRight: '5px' }}>
                      {selectedSize.value}
                    </Typography>
                  )}
                </ListItem>
              );
            })}
          </List>
          <Typography variant="h6" gutterBottom>
            Total Price: {`Total: MYR ${totalPrice}`}
          </Typography>

          <TextField
            label="Recipient name"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            fullWidth
            margin="normal"
          />          
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="secondary" onClick={handleOpenPayment}>
            Proceed to payment
          </Button>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
      )}

      <Dialog open={paymentOpen} onClose={handleClosePayment}>
        <DialogTitle>Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Total Price: {`MYR ${totalPrice}`}</Typography>
          <Typography variant="body2">Enter your payment details below:</Typography>
          <TextField label="Card Number" fullWidth margin="normal" />
          <TextField label="Expiry Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />          
          <TextField label="CVV" fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePayment} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePayment} color="primary">
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Container>
  );
}

export default CheckoutPage;
