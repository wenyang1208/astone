import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button, Grid, Paper } from '@mui/material';
import { SellerService } from '../../services/SellerService';
import SellerSidebar from '../../components/sellerSidebar';
import SellerHeader from '../../components/sellerHeader';

const Shipment = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const sellerService = new SellerService();

  useEffect(() => {
    fetchProductsToShip();
  }, []);

  const fetchProductsToShip = async () => {
    try {
      const response = await sellerService.incrementShipment();
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products to ship:', error);
    }
  };

  const handleShipment = async (productId) => {
    try {
      await sellerService.incrementShipment(productId);
      // Refresh the list after processing
      fetchProductsToShip();
    } catch (error) {
      console.error('Failed to process shipment:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <SellerHeader sx={{ position: 'fixed', zIndex: 1200 }} />
      <Grid container>
        <Grid item xs={1.5}>
          <SellerSidebar />
        </Grid>
        <Grid item xs sx={{ backgroundColor: '#f5f5f5' }}>
          <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, fontSize: 30, mb: 2 }}>
                Products to Ship
              </Typography>
              <List>
                {products.map((product) => (
                  <ListItem key={product.id} divider>
                    <ListItemText
                      primary={product.name}
                      secondary={`Order ID: ${product.orderId}`}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleShipment(product.id)}
                    >
                      Process Shipment
                    </Button>
                  </ListItem>
                ))}
              </List>
              {products.length === 0 && (
                <Typography>No products to ship at the moment.</Typography>
              )}
              <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
                Back to Dashboard
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Shipment;