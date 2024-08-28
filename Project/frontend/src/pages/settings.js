import React, { useState, useEffect } from 'react';
import {
  Container, Box, TextField, Button, Typography, CssBaseline, Divider,
  Tabs, Tab, FormControlLabel, Switch, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyAppBar from '../components/appBar';
import { UserService } from '../services/UserService';

// Define a purple theme with black text
const purpleTheme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a', // Purple color
    },
    secondary: {
      main: '#ab47bc', // Light purple color
    },
    background: {
      default: '#fff', // White background
    },
    text: {
      primary: '#000', // Black text
    },
  },
});

const Settings = () => {
  const [tab, setTab] = useState('account');
  const [userDetails, setUserDetails] = useState({});
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch user details from API
    const fetchUserDetails = async () => {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        const response = await new UserService().get_user_details(userEmail);
        if (response && response.status === 200) {
          setUserDetails(response.data);
          setNotificationsEnabled(response.data.notifications_enabled || false);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSave = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      const response = await new UserService().updateUser(userEmail, userDetails);
      if (response && response.status === 200) {
        // Handle successful update
        console.log('Profile updated successfully');
      } else {
        // Handle error
        console.error('Failed to update profile');
      }
    }
  };

  const handleRefresh = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      const response = await new UserService().get_user_details(userEmail);
      if (response && response.status === 200) {
        setUserDetails(response.data);
        setNotificationsEnabled(response.data.notifications_enabled || false);
      } else {
        console.error('Failed to fetch user details');
      }
    }
  };

  const handleToggleNotifications = (event) => {
    setNotificationsEnabled(event.target.checked);
    setUserDetails({ ...userDetails, notifications_enabled: event.target.checked });
  };

  const handleAccountDeletion = () => {
    // Show the dialog when the button is pressed
    setOpen(true);
  };

  const handleClose = () => {
    // Close the dialog
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      <MyAppBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 40px)', paddingTop: '40px' }}>
        {/* Main content container with spacing */}
        <Box
          sx={{
            flex: 1,
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            backgroundColor: '#f4f4f4',
            mb: '40px' // Add bottom margin for space before end of page
          }}
        >
          {/* Tabs for navigation */}
          <Tabs value={tab} onChange={handleTabChange} aria-label="settings tabs" sx={{ mb: 2 }}>
            <Tab value="account" label="Account" />
            <Tab value="preferences" label="Preferences" />
            <Tab value="privacy" label="Privacy" />
          </Tabs>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ padding: '16px' }}>
            {tab === 'account' && (
              <Box sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Email"
                  name="email"
                  value={userDetails.email || ''}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: purpleTheme.palette.text.primary } }}
                  InputProps={{ style: { color: purpleTheme.palette.text.primary } }}
                  disabled
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={userDetails.first_name || ''}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: purpleTheme.palette.text.primary } }}
                  InputProps={{ style: { color: purpleTheme.palette.text.primary } }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  value={userDetails.last_name || ''}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: purpleTheme.palette.text.primary } }}
                  InputProps={{ style: { color: purpleTheme.palette.text.primary } }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={userDetails.gender || ''}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: purpleTheme.palette.text.primary } }}
                  InputProps={{ style: { color: purpleTheme.palette.text.primary } }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  value={userDetails.phone_number || ''}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: purpleTheme.palette.text.primary } }}
                  InputProps={{ style: { color: purpleTheme.palette.text.primary } }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Address"
                  name="address"
                  value={userDetails.address || ''}
                  onChange={handleChange}
                  InputLabelProps={{ style: { color: purpleTheme.palette.text.primary } }}
                  InputProps={{ style: { color: purpleTheme.palette.text.primary } }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mr: 2 }}
                    onClick={handleRefresh}
                  >
                    Refresh
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            )}
            {tab === 'preferences' && (
              <Box sx={{ width: '100%' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationsEnabled}
                      onChange={handleToggleNotifications}
                    />
                  }
                  label="Enable Notifications"
                />
              </Box>
            )}
            {tab === 'privacy' && (
              <Box sx={{ width: '100%' }}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2, maxWidth: '200px', borderRadius: '4px', padding: '8px' }}
                  onClick={handleAccountDeletion}
                >
                  Request Account Deletion
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Popup dialog for account deletion */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Request Submitted"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your account deletion request has been submitted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Settings;
