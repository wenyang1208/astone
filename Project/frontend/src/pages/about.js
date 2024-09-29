import React from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material';
import { useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const About = () => {

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
    <div>
      <h1>About Us</h1>
      <p>This is the about page.</p>

        {/* Add a button to simulate return confirmation*/}
        {!returnInitiated && (
        <Button variant="contained" color="primary" onClick={handleReturnClick} sx={{mt: 2 }}>
          Return Product
        </Button>
        )}

        {/* Add a button to simulate cancel confirmation*/}
        {!cancelInitiated && !returnInitiated && (
          <Button variant="contained" color="primary" onClick={handleCancelClick} sx={{mt: 2, ml: 2 }}>
            Cancel Order
          </Button>
        )}

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

    </div>
  );
};

export default About;