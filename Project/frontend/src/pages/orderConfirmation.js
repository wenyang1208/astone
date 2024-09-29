import React from 'react';
import { Container, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import { useState } from 'react';

function OrderConfirmationPage({ orderDetails }) {

  const [returnInitiated, setReturnInitiated] = useState(false);
  const [openReturnDialog, setOpenReturnDialog] = useState(false);

  // Function to handle opening the return confirmation dialog
  const handleReturnClick = () => {
    setOpenReturnDialog(true);
  };

  // Function to handle confirming the return
  const confirmReturn = () => {
    setReturnInitiated(true);
    setOpenReturnDialog(false);
  };

  // Function to handle closing the dialog without returning
  const handleCloseDialog = () => {
    setOpenReturnDialog(false);
  };

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


        {/* Add a button to simulate return confirmation*/}
        {!returnInitiated && (
        <Button variant="contained" color="primary" onClick={handleReturnClick} sx={{ mt: 2 }}>
          Return/Refund
        </Button>
      )}

        {/* Dialog for Return Confirmation */}
        <Dialog open={openReturnDialog} onClose={handleCloseDialog}>
          
          <DialogTitle> Confirm Return</DialogTitle>
          
          <DialogContent>
            <Typography>Are you sure you want to return this product?</Typography>
            <Typography variant="h6" gutterBottom>
            Order Details
            </Typography>
            <Typography variant="body1">
              Order ID: {orderDetails.id}
            </Typography>
            <Typography variant="body1">
              Refund Amount: {'MYR' + orderDetails.total_price}
            </Typography>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
            <Button onClick={confirmReturn} color="primary">Confirm Return</Button>
          </DialogActions>

      </Dialog>
      </Box>
    </Container>
  );
}

export default OrderConfirmationPage;