import React, { useState, useEffect } from 'react';
import {
  Container, Box, TextField, Button, Typography, CssBaseline, Grid, Divider,
  List, ListItem, ListItemText, Switch, FormControlLabel
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
  
  useEffect(() => {
    // Fetch user details from API
    const fetchUserDetails = async () => {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        const response = await new UserService().get_user_details(userEmail);
        if (response && response.status === 200) {
          setUserDetails(response.data);
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

  const handleToggleNotifications = (event) => {
    setNotificationsEnabled(event.target.checked);
    // Optionally, save this preference to the server or localStorage
  };

  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      <MyAppBar />
      <Container maxWidth="lg" sx={{ pt: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={2} sx={{ minWidth: '200px', bgcolor: '#f4f4f4', height: '100vh', position: 'fixed', left: 0, top: 0, borderRight: '1px solid #ddd' }}>
            <List>
              <ListItem button onClick={() => setTab('account')}>
                <ListItemText primary="Account" />
              </ListItem>
              <ListItem button onClick={() => setTab('preferences')}>
                <ListItemText primary="Preferences" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={10} sx={{ marginLeft: '210px', padding: '20px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {tab === 'account' ? 'Account Settings' : 'Preferences'}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {tab === 'account' ? (
                <Box sx={{ width: '100%' }}>
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
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </Box>
              ) : (
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
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Settings;
