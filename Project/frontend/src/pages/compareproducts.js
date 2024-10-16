import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/ProductService';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import MyAppBar from '../components/appBar';

const BASE_URL = 'https://astone-backend-app.onrender.com';

const CompareProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts1, setFilteredProducts1] = useState([]);
  const [filteredProducts2, setFilteredProducts2] = useState([]);
  const [product1, setProduct1] = useState('');
  const [product2, setProduct2] = useState('');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  useEffect(() => {
    const productService = new ProductService();

    productService
      .getProducts()
      .then((res) => {
        const parsedProducts = res.data.map((product) => ({
          ...product,
        }));
        setProducts(parsedProducts);
        setFilteredProducts1(parsedProducts);
        setFilteredProducts2(parsedProducts);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []);

  const handleInputChange1 = (e) => {
    setInput1(e.target.value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts1(filtered);
  };

  const handleInputChange2 = (e) => {
    setInput2(e.target.value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts2(filtered);
  };

  const getProductDetails = (productId) => {
    return products.find((p) => p.id === productId);
  };

  const productDetails1 = product1 ? getProductDetails(product1) : null;
  const productDetails2 = product2 ? getProductDetails(product2) : null;

  return (
    <div>
      <MyAppBar />
      <Container>
        <Typography variant="h4" align="center" gutterBottom marginTop="2%">
          Compare Products
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {/* First product input */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Type First Product"
              fullWidth
              value={input1}
              onChange={handleInputChange1}
            />
            <Box mt={1}>
              {filteredProducts1.map((product) => (
                <Typography
                  key={product.id}
                  onClick={() => {
                    setProduct1(product.id);
                    setInput1(product.name); // To show selected product name
                    setFilteredProducts1([]); // Clear suggestions
                  }}
                  style={{ cursor: 'pointer', marginBottom: '5px' }}
                >
                  {product.name}
                </Typography>
              ))}
            </Box>
            <FormControl fullWidth>
              <InputLabel id="select-product1-label">Select First Product</InputLabel>
              <Select
                labelId="select-product1-label"
                value={product1}
                onChange={(e) => {
                  setProduct1(e.target.value);
                  const selectedProduct = products.find(p => p.id === e.target.value);
                  setInput1(selectedProduct ? selectedProduct.name : '');
                }}
              >
                <MenuItem value="" disabled>Select First Product</MenuItem>
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Second product input */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Type Second Product"
              fullWidth
              value={input2}
              onChange={handleInputChange2}
            />
            <Box mt={1}>
              {filteredProducts2.map((product) => (
                <Typography
                  key={product.id}
                  onClick={() => {
                    setProduct2(product.id);
                    setInput2(product.name); // To show selected product name
                    setFilteredProducts2([]); // Clear suggestions
                  }}
                  style={{ cursor: 'pointer', marginBottom: '5px' }}
                >
                  {product.name}
                </Typography>
              ))}
            </Box>
            <FormControl fullWidth>
              <InputLabel id="select-product2-label">Select Second Product</InputLabel>
              <Select
                labelId="select-product2-label"
                value={product2}
                onChange={(e) => {
                  setProduct2(e.target.value);
                  const selectedProduct = products.find(p => p.id === e.target.value);
                  setInput2(selectedProduct ? selectedProduct.name : '');
                }}
              >
                <MenuItem value="" disabled>Select Second Product</MenuItem>
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {productDetails1 && productDetails2 && (
          <Grid container spacing={6} justifyContent="center" style={{ marginTop: '30px' }}>
            <Grid item xs={12} sm={6} md={5}>
              <Card>
                <CardMedia
                  component="img"
                  image={
                    productDetails1?.images.length > 0
                      ? `${BASE_URL}${productDetails1.images[0].image_url}`
                      : 'https://via.placeholder.com/140'
                  }
                  alt={productDetails1.name}
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="h5">{productDetails1.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {productDetails1.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: {productDetails1.currency} {productDetails1.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Stock: {productDetails1.stock}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Rating: {productDetails1.rating}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Sizes: {productDetails1.sizes.map((size) => size.value).join(', ')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Colors:
                  </Typography>
                  <Box display="flex" flexDirection="row">
                    {productDetails1.colors.map((color) => (
                      <Box
                        key={color.name}
                        style={{
                          backgroundColor: color.hex,
                          width: '20px',
                          height: '20px',
                          marginRight: '5px',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <Card>
                <CardMedia
                  component="img"
                  image={
                    productDetails2?.images.length > 0
                      ? `${BASE_URL}${productDetails2.images[0].image_url}`
                      : 'https://via.placeholder.com/140'
                  }
                  alt={productDetails2.name}
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="h5">{productDetails2.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {productDetails2.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: {productDetails2.currency} {productDetails2.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Stock: {productDetails2.stock}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Rating: {productDetails2.rating}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Sizes: {productDetails2.sizes.map((size) => size.value).join(', ')}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Colors:
                  </Typography>
                  <Box display="flex" flexDirection="row">
                    {productDetails2.colors.map((color) => (
                      <Box
                        key={color.name}
                        style={{
                          backgroundColor: color.hex,
                          width: '20px',
                          height: '20px',
                          marginRight: '5px',
                        }}
                      />
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
