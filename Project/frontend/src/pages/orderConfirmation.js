import React, { useState } from 'react';
import { Container, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderConfirmationPage({ orderDetails }) {
  const [dialogType, setDialogType] = useState(null); // 'return' or 'cancel'

  // Show toast notifications
  const notify = (message) => {
    toast.success(message, { position: "top-center", autoClose: 3000 });
  };

  // Dialog handling
  const handleOpenDialog = (type) => {
    setDialogType(type);
  };

  const handleCloseDialog = () => {
    setDialogType(null);
  };

  const handleConfirmAction = () => {
    if (dialogType === 'return') {
      notify('Return initiated successfully!');
    } else if (dialogType === 'cancel') {
      notify('Your order has been successfully cancelled!');
    }
    handleCloseDialog();
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
        <Typography variant="body1">Order ID: {orderDetails.id}</Typography>
        <Typography variant="body1">Total Price: {'MYR' + orderDetails.total_price}</Typography>
        <Typography variant="body1">Address: {orderDetails.address}</Typography>

        {/* Buttons for actions */}
        {!dialogType && (
          <>
            <Button variant="contained" color="primary" onClick={() => handleOpenDialog('return')} sx={{ mt: 2 }}>
              Return Product
            </Button>

            <Button variant="contained" color="secondary" onClick={() => handleOpenDialog('cancel')} sx={{ mt: 2, ml: 2 }}>
              Cancel Order
            </Button>
          </>
        )}

        {/* Confirmation Dialog */}
        {dialogType === 'return' && (
          <ConfirmationDialog
            open={dialogType === 'return'}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmAction}
            title="Confirm Return"
            content={
              <>
                Are you sure you want to return this product?
                <Typography variant="body2">Order ID: {orderDetails.id}</Typography>
                <Typography variant="body2">Refund Amount: MYR 34.5</Typography>
              </>
            }
          />
        )}

        {dialogType === 'cancel' && (
          <ConfirmationDialog
            open={dialogType === 'cancel'}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmAction}
            title="Confirm Cancelation"
            content="Are you sure you want to cancel this order?"
          />
        )}

        <ToastContainer />
      </Box>
    </Container>
  );
}

export default OrderConfirmationPage;
