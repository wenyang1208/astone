import React from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from '@mui/material';
import { useState } from 'react';

const About = () => {

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
    setReturnInitiated(false);
  };

  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page.</p>

        {/* Add a button to simulate return confirmation*/}
        {!returnInitiated && (
        <Button variant="contained" color="primary" onClick={handleReturnClick} sx={{ mt: 2 }}>
          Return Product
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
    </div>
  );
};

export default About;