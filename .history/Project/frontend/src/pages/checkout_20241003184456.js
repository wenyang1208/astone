import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress, Box, TextField, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { OrderService } from '../services/OrderService';
import { OrderService } from '../services/OrderService';

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
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const fetchCartItems = async () => {
    const orderService = new OrderService();
    try {
      const res = await orderService.getCart();
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
  }, []);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    const orderService = new OrderService();
    const sellerService = new SellerService();
    try {
      const res = await orderService.placeOrder(address);
      if (res && res.data) {
        const orderId = res.data.order_id;
        const orderRes = await orderService.getOrderDetails(orderId);
        if (orderRes && orderRes.data) {
          for(let i = 0; i < orderRes.data.order_items.length; i++){
            const orderItem = orderRes.data.order_items[i];
            const sellerId = orderItem.product.seller;
            const toProcessedShipment = orderItem.quantity;
            await sellerService.incrementShipment(sellerId, {
              to_processed_shipment: toProcessedShipment,
            });
          }
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
    }, 2000); // Simulate payment processing time
  };

  // for return order
  const [returnInitiated, setReturnInitiated] = useState(false); 
  const [openReturnDialog, setOpenReturnDialog] = useState(false); 
  // for cancel order
  const [cancelInitiated, setCancelInitiated] = useState(false);  
  const [openCancelDialog, setOpenCancelDialog] = useState(false); 

  // Function to handle opening the return confirmation dialog
  const handleReturnClick = () => {
    setOpenReturnDialog(true);
  };

  // Function to handle opening the cancel confirmation dialog
  const handleCancelClick = () => {
    setOpenCancelDialog(true);
  };

  // Function to handle confirming the return
  const confirmReturn = () => {
    setReturnInitiated(true);
    setOpenReturnDialog(false);
  };

    // Function to handle confirming the cancel
    const confirmCancel = () => {
      setCancelInitiated(true);
      setOpenCancelDialog(false);
      cancelNotification();
    };

  // Function to handle closing the dialog without returning
  const handleCloseDialog = () => {
    setReturnInitiated(false);
    setOpenReturnDialog(false);
  };

  
  // Function to show cancel is successful performed
  const cancelNotification = () => {
    toast.success('Your order has been succesfully cancelled!', 
    {
        position:"top-center",
        autoClose: 3000
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom marginTop="5%">
        Checkout
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
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
                    {/* Return Product Button */}
                    {!returnInitiated && (
            <Button variant="contained" color="primary" onClick={handleReturnClick} sx={{ mt: 2 }}>
              Return Product
            </Button>
          )}

          {/* Cancel Order Button */}
          {!cancelInitiated && !returnInitiated && (
            <Button variant="contained" color="primary" onClick={handleCancelClick} sx={{ mt: 2, ml: 2 }}>
              Cancel Order
            </Button>
          )}
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
          <Button onClick={handleClosePayment} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePayment} color="primary" disabled={paymentLoading}>
            {paymentLoading ? <CircularProgress size={24} /> : 'Pay'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Return Confirmation */}
      <Dialog open={openReturnDialog} onClose={handleCloseDialog}>
        <DialogTitle> Confirm Return</DialogTitle>
        <DialogContent>
          <Typography variant = 'body1' gutterBottom>
            Are you sure you want to return this product?
          </Typography>
            <Typography variant="h7" gutterBottom>
            Refund Details
          </Typography>
          <Typography variant="body2" >
            Order ID: 123445
          </Typography>
          <Typography variant="body2">
            Refund Amount: 34.5
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={confirmReturn} color="primary">Confirm Return</Button>
        </DialogActions>
      </Dialog>

        {/* Dialog for Cancel Confirmation */}
        <Dialog open={openCancelDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Cancelation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to cancel this order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Back</Button>
          <Button onClick={confirmCancel} color="primary">Confirm Cancel</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />

    </Container>
  );
}

export default CheckoutPage;