import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/ProductService';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MyAppBar from '../components/appBar';

// const BASE_URL = 'https://astone-backend-app.onrender.com';
const BASE_URL = 'https://localhost8000';

const CompareProducts = () => {
  const [products, setProducts] = useState([]);
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

  useEffect(() => {
    const productService = new ProductService();

    productService.getProducts()
      .then(res => {
        // Ensure colors and sizes are parsed correctly
        console.log(res.data);
        const parsedProducts = res.data.map(product => ({
          ...product        
        }));
        console.log(parsedProducts);
        setProducts(parsedProducts);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, []);

  const handleCompare = () => {
    // Add comparison logic if needed
  };

  const getProductDetails = (productId) => {
    return products.find(p => p.id === productId);
  };

  const productDetails1 = product1 ? getProductDetails(product1) : null;
  const productDetails2 = product2 ? getProductDetails(product2) : null;

  return (
    <div>
      <MyAppBar></MyAppBar>
      <Container>
        <Typography variant="h4" align="center" gutterBottom marginTop="2%">Compare Products</Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Select First Product</InputLabel>
              <Select value={product1} onChange={(e) => setProduct1(e.target.value)}>
                <MenuItem value="" disabled>Select First Product</MenuItem>
                {products.map(product => (
                  <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Select Second Product</InputLabel>
              <Select value={product2} onChange={(e) => setProduct2(e.target.value)}>
                <MenuItem value="" disabled>Select Second Product</MenuItem>
                {products.map(product => (
                  <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCompare}
            startIcon={<SwapHorizIcon />}
          >
            Start Comparison
          </Button>
        </div> */}

        {productDetails1 && productDetails2 && (
          <Grid container spacing={6} justifyContent="center" style={{ marginTop: '30px' }}>
            <Grid item xs={12} sm={6} md={5}>
              <Card>
                <CardMedia
                  component="img"
                  image={productDetails1?.images.length > 0 ? `${BASE_URL}${productDetails1.images[0].image_url}` : 'https://via.placeholder.com/140'}
                  alt={productDetails1.name}
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="h5">{productDetails1.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{productDetails1.description}</Typography>
                  <Typography variant="body2" color="textSecondary">Price: {productDetails1.currency} {productDetails1.price}</Typography>
                  <Typography variant="body2" color="textSecondary">Stock: {productDetails1.stock}</Typography>
                  <Typography variant="body2" color="textSecondary">Rating: {productDetails1.rating}</Typography>
                  <Typography variant="body2" color="textSecondary">Sizes: {productDetails1.sizes.map(size => size.value).join(', ')}</Typography>
                  <Typography variant="body2" color="textSecondary">Colors:</Typography>
                  <Box display="flex" flexDirection="row">
                    {productDetails1.colors.map(color => (
                      <Box key={color.name} style={{ backgroundColor: color.hex, width: '20px', height: '20px', marginRight: '5px' }} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <Card>
                <CardMedia
                  component="img"
                  image={productDetails2?.images.length > 0 ? `${BASE_URL}${productDetails2.images[0].image_url}` : 'https://via.placeholder.com/140'}
                  alt={productDetails2.name}
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="h5">{productDetails2.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{productDetails2.description}</Typography>
                  <Typography variant="body2" color="textSecondary">Price: {productDetails2.currency} {productDetails2.price}</Typography>
                  <Typography variant="body2" color="textSecondary">Stock: {productDetails2.stock}</Typography>
                  <Typography variant="body2" color="textSecondary">Rating: {productDetails2.rating}</Typography>
                  <Typography variant="body2" color="textSecondary">Sizes: {productDetails2.sizes.map(size => size.value).join(', ')}</Typography>
                  <Typography variant="body2" color="textSecondary">Colors:</Typography>
                  <Box display="flex" flexDirection="row">
                    {productDetails2.colors.map(color => (
                      <Box key={color.name} style={{ backgroundColor: color.hex, width: '20px', height: '20px', marginRight: '5px' }} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>      
    </div>

  );
};

export default CompareProducts;
