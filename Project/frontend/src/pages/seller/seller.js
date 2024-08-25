import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import { SellerService } from '../../services/SellerService'; // Adjust the import path if necessary
import { ACCESS_TOKEN } from '../../constant';
import { jwtDecode } from 'jwt-decode';


const sellerService = new SellerService();
const Seller = () => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem(ACCESS_TOKEN);
  const sellerId = jwtDecode(token).seller_id;

  const [formValues, setFormValues] = useState({
    shopName: '',
  });

  const [formErrors, setFormErrors] = useState({});
  
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const data = await sellerService.getSellerById(sellerId);
        setSeller(data.data); // Adjust this line if your API response structure is different
        setLoading(false);
      } catch (err) {
        setError('Failed to load seller profile');
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [sellerId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await sellerService.editSeller(sellerId, {
        shop_name: formValues.shopName,
        phone_number: seller.phone_number,
        address: seller.address,
      });
  
      if (response.status === 200) {
        console.log('Profile updated successfully');
        setIsEditing(false);
        // Refresh seller data
        const updatedData = await sellerService.getSellerById(sellerId);
        setSeller(updatedData.data);
      } else {
        console.error('Profile update failed', response.data);
        setError('Failed to save seller profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to save seller profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeller({ ...seller, [name]: value });
  };

  const handleShopName = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!seller) return <Typography>No seller data found</Typography>;

  const isProfileIncomplete = !seller.phone || !seller.address || !seller.shopName;

  if (isEditing || isProfileIncomplete) {
    return (
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h4" gutterBottom>
            Complete Your Profile
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  name="shopName"
                  required
                  fullWidth
                  id="shopName"
                  label="Shop Name"
                  value={formValues.shopName}
                  onChange={handleShopName}
                  error={!!formErrors.shopName}
                  helperText={formErrors.shopName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  autoFocus
                  value={seller.phone_number || ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  value={seller.address || ''}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSave}
            >
              Save Profile
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={4}>
            <Avatar
              alt={`${seller.firstName} ${seller.lastName}`}
              src="/path-to-avatar.jpg" // You might want to add an avatar field to your seller data
              sx={{ width: 150, height: 150, margin: 'auto' }}
            />
          </Grid> */}
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              {seller.firstName} {seller.lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {seller.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Phone: {seller.phone_number || 'Not provided'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Address: {seller.address || 'Not provided'}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Seller;
