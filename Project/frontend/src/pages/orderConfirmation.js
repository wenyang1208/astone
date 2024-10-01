import React, { useState } from 'react';
import { Container, Typography, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderConfirmationPage({ orderDetails }) {

  const [returnInitiated, setReturnInitiated] = useState(false);
  const [openReturnDialog, setOpenReturnDialog] = useState(false);
  const [cancelInitiated, setCancelInitiated] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  // Handlers for opening dialogs
  const handleReturnClick = () => setOpenReturnDialog(true);
  const handleCancelClick = () => setOpenCancelDialog(true);

  // Handlers for confirming actions
  const confirmReturn = () => {
    setReturnInitiated(true);
    setOpenReturnDialog(false);
  };

  const confirmCancel = () => {
    setCancelInitiated(true);
    setOpenCancelDialog(false);
    cancelNotification();
  };

  // Handler for closing dialogs without action
  const handleCloseDialog = () => {
    setOpenReturnDialog(false);
    setOpenCancelDialog(false);
  };

  // Toast notification for order cancellation
  const cancelNotification = () => {
    toast.success('Your order has been successfully cancelled!', {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order Confirmation
      </Typography>

      <Box mt={2}>
        {/* Return Product Button */}
        {!returnInitiated && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleReturnClick}
            sx={{ mt: 2 }}
          >
            Return Product
          </Button>
        )}

        {/* Cancel Order Button */}
        {!cancelInitiated && !returnInitiated && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleCancelClick}
            sx={{ mt: 2, ml: 2 }}
          >
            Cancel Order
          </Button>
        )}
      </Box>

      {/* Return Confirmation Dialog */}
      <Dialog open={openReturnDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Return</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to return this product?
          </Typography>
          <Typography variant="h6" gutterBottom>
            Refund Details
          </Typography>
          <Typography variant="body2">Order ID: 123445</Typography>
          <Typography variant="body2">Refund Amount: $34.50</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmReturn} color="primary">
            Confirm Return
          </Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={openCancelDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to cancel this order?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Back
          </Button>
          <Button onClick={confirmCancel} color="primary">
            Confirm Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Container>
  );
}

export default OrderConfirmationPage;
