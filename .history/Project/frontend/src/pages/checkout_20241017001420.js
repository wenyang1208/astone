import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress, Box, TextField, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OrderService } from '../services/OrderService';
import { SellerService } from '../services/SellerService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserService } from '../services/UserService';

function CheckoutPage() {
  const BASE_URL = 'http://localhost:8000';
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [usePoints, setUsePoints] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [discount, setDiscount] = useState(0);


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

  const fetchUserPoints = async () => {
    const orderService = new OrderService();
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userEmail) {
        console.error('User email not found. Please log in.');
        return;
    }

    try {
      const res = await new UserService().get_user_details(userEmail);
      if (res && res.data) {
          setUserPoints(res.data.points);
      }
    } catch (error) {
      console.error('Error fetching user points:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchUserPoints();
  }, []);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    const orderService = new OrderService();
    const sellerService = new SellerService();
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userEmail) {
        setError('User email not found. Please log in.');
        setLoading(false);
        return;
    }

    try {
      const res = await orderService.placeOrder(address);
      if (res && res.data) {
        const orderId = res.data.order_id;
        const orderRes = await orderService.getOrderDetails(orderId);
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
        }
      }

      let finalTotalPrice = totalPrice;
      if (usePoints) {
          finalTotalPrice -= discount;
          await orderService.deductPoints(userEmail, discount);
      }
      
    const res = await orderService.placeOrder(address, userEmail);
    if (res && res.data) {
        const orderId = res.data.order_id;
        const orderRes = await orderService.getOrderDetails(orderId, userEmail);
        if (orderRes && orderRes.data) {
            setOrderDetails(orderRes.data);
        }
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
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
    }, 2000);
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
        <Paper elevation={3} sx={{ p: 3 }}>
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
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <List>
                {cartItems.map((item, index) => {
                  const colors = item.product.colors;
                  const sizes = item.product.sizes;
                  const selectedColor = colors.find(color => color.code === item.color);
                  const selectedSize = sizes.find(size => size.value === item.size);
                  const imageUrl = item.product?.images ? `${BASE_URL}${item.product.images[0].image_url}` : 'https://via.placeholder.com/200';

                  return (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <img src={imageUrl} alt={item.product.name} style={{ width: 80, height: 80, marginRight: 16, objectFit: 'cover' }} />
                        <ListItemText
                          primary={item.product.name}
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2" color="text.primary">
                                {`${item.quantity} x MYR ${item.price}`}
                              </Typography>
                              {selectedColor && (
                                <Box component="span" sx={{ display: 'inline-block', width: 20, height: 20, bgcolor: selectedColor.code, ml: 1, mr: 1, verticalAlign: 'text-bottom' }} />
                              )}
                              {selectedSize && (
                                <Typography component="span" variant="body2">
                                  {selectedSize.value}
                                </Typography>
                              )}
                            </React.Fragment>
                          }
                        />
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          MYR {item.total_price.toFixed(2)}
                        </Typography>
                      </ListItem>
                      {index < cartItems.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  );
                })}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              <TextField
                label="Recipient name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />          
              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={3}
              />
              <Box sx={{ mt: 3, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Total: MYR {totalPrice}
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                size="large"
                onClick={handleOpenPayment}
              >
                Proceed to payment
              </Button>
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}

      <Dialog open={paymentOpen} onClose={handleClosePayment}>
        <DialogTitle>Payment</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>Total Price: MYR {totalPrice}</Typography>
          <Typography variant="body2" gutterBottom>Enter your payment details below:</Typography>
          <TextField label="Card Number" fullWidth margin="normal" variant="outlined" />
          <TextField 
            label="Expiry Date" 
            type="date" 
            fullWidth 
            margin="normal" 
            variant="outlined"
            InputLabelProps={{ shrink: true }} 
          />          
          <TextField label="CVV" fullWidth margin="normal" variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePayment} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePayment} color="primary" disabled={paymentLoading}>
            {paymentLoading ? <CircularProgress size={24} /> : 'Pay'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CheckoutPage;