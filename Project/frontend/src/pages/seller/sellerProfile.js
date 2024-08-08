import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Paper, Avatar, TextField, Button } from '@mui/material';
import { SellerService } from '../../services/SellerService'; // Adjust the import path if necessary

const sellerService = new SellerService();

const SellerProfile = ({ sellerId }) => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
      await sellerService.updateSeller(sellerId, seller);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to save seller profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeller({ ...seller, [name]: value });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!seller) return <Typography>No seller data found</Typography>;

  const isProfileIncomplete = !seller.phone || !seller.address || !seller.gender;

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
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  autoFocus
                  value={seller.phone || ''}
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
              <Grid item xs={12}>
                <TextField
                  name="gender"
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                  value={seller.gender || ''}
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
          <Grid item xs={12} sm={4}>
            <Avatar
              alt={`${seller.firstName} ${seller.lastName}`}
              src="/path-to-avatar.jpg" // You might want to add an avatar field to your seller data
              sx={{ width: 150, height: 150, margin: 'auto' }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              {seller.firstName} {seller.lastName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {seller.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Phone: {seller.phone || 'Not provided'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Gender: {seller.gender || 'Not specified'}
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

export default SellerProfile;
