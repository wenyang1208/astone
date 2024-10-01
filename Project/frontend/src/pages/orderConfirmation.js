import React from 'react';
import { Container, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import { useState } from 'react';

function OrderConfirmationPage({ orderDetails }) {

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order Confirmation
      </Typography>
      <Box>
        <Typography variant="h6" gutterBottom>
          Order Details
        </Typography>
        <Typography variant="body1">
          Order ID: {orderDetails.id}
        </Typography>
        <Typography variant="body1">
          Total Price: {'MYR' + orderDetails.total_price}
        </Typography>
        <Typography variant="body1">
          Address: {orderDetails.address}
        </Typography>
        {/* Add more order details as needed */}


      </Box>
    </Container>
  );
}

export default OrderConfirmationPage;