import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import { SellerService } from '../services/SellerService'; // Adjust the import path if necessary

const sellerService = new SellerService();

const SellerProfile = ({ sellerId }) => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const data = await sellerService.getSellerById(sellerId);
        setSeller(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load seller profile');
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [sellerId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!seller) return <Typography>No seller data found</Typography>;

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
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SellerProfile;