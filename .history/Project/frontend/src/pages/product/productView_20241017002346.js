import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import { OrderService } from '../../services/OrderService';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Select,
  Toolbar,
  Typography,
  MenuItem,
  Chip,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MyAppBar from '../../components/appBar';

const Aston = ({ className, divClassName }) => {
  return (
    <div className={`aston ${className}`}>
      <div className={`text-wrapper ${divClassName}`}>Astoné</div>
    </div>
  );
};

const BASE_URL = 'http://localhost:8000';


function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    console.log(product);
  },product)

  useEffect(() => {
    const fetchProduct = async () => {
      const productService = new ProductService();
      try {
        const res = await productService.getProductById(id);
        if (res && res.data) {
          console.log(res.data);
          const productData = res.data;
          // Parse colors and sizes fields
          productData.sizes = productData.sizes;
          console.log(productData);

          setProduct(productData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSizeChange = (value) => {
    setSize(value);
  };

  const handleColorChange = (value) => {
    setColor(value);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmitReview = () => {
    console.log('Rating:', rating);
    console.log('Review:', review);
  };

  const handleAddToCart = async () => {
    if (!size || !color) {
      setSnackbarMessage('Please select both size and color.');
      setOpenSnackbar(true);
      return;
  }

  const userEmail = localStorage.getItem('userEmail');
  if (!userEmail) {
      setSnackbarMessage('User email not found. Please log in.');
      setOpenSnackbar(true);
      return;

    }

    const orderService = new OrderService();
    try {
      const res = await orderService.addToCart(id, size, color);
      if (res && res.data) {
        console.log('Product added to cart:', res.data);
        window.location.reload()
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const calculateSavings = (originalPrice, currentPrice) => {
    return (originalPrice - currentPrice).toFixed(2);
  };

  return (
      <div>
        <MyAppBar/>
        <Container sx={{ marginTop: '20px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper>
                <img
                  src={(product?.images && product.images.length > 0) ? `${BASE_URL}${product.images[0].image_url}` : 'https://via.placeholder.com/750'}
                  alt={product?.name}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {product?.name}
              </Typography>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                {/* Original price with strikethrough */}
                {product?.original_price > product?.price && (
                  <span style={{ textDecoration: 'line-through', marginRight: '10px' }}>
                    {product.currency} {product.original_price}
                  </span>
                )}
                {/* Current price */}
                {product?.currency} {product?.price}
              </Typography>
              {/* Display savings if original_price exists */}
              {product?.original_price > product?.price && (
                <Typography variant="body1" color="red">
                  Amount saved: {product.currency} {calculateSavings(product.original_price, product.price)}
                </Typography>
              )}
              <Typography gutterBottom>
                Description: {product?.description}
              </Typography>
              <Typography gutterBottom>
                Brand: {product?.brand}
              </Typography>
              <Typography gutterBottom>
                Date Added: {product?.dateAdded}
              </Typography>
              <Typography gutterBottom>
                {product?.tags?.map((tag, index) => (
                  <Chip color='primary' key={index} label={tag} style={{ margin: '5px' }}/>
                ))}
              </Typography>
              <div>
                <Typography gutterBottom>
                  Size:
                </Typography>
                {product?.sizes?.map((sizeOption) => (
                  <Chip
                    key={sizeOption.value}
                    label={sizeOption.value}
                    onClick={() => handleSizeChange(sizeOption.value)}
                    color={size === sizeOption.value ? 'primary' : 'default'}
                    style={{ margin: '5px' }}
                  />
                ))}
              </div>
              <br />
              <div>
                <Typography gutterBottom>
                  Color:
                </Typography>
                {product?.colors?.map((colorOption, index) => (
                  <Chip
                    key={index}
                    label={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                          style={{
                            backgroundColor: colorOption.hex,
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                          }}
                        />
                      </div>
                    }
                    clickable
                    style={{ margin: '5px' }}
                    onClick={() => handleColorChange(colorOption.hex)}
                    variant={color === colorOption.hex ? 'default' : 'outlined'}
                  />
                ))}
              </div>
              <br />
              <div>
                <Typography gutterBottom>
                  Order Quantity:
                </Typography>
                <Select value={quantity} onChange={handleQuantityChange}>
                  {[...Array(10).keys()].map((value) => (
                    <MenuItem key={value} value={value + 1}>
                      {value + 1}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <br />
              <div>
                <Button
                  startIcon={<ShoppingCartIcon />}
                  variant='contained'
                  onClick={handleAddToCart}
                  // disabled={!size || !color}
                >
                  Add to Cart
                </Button>
              </div>
              <br />
              <div>
                <Typography gutterBottom>
                  Rating:
                </Typography>
                <Rating
                  name="product-rating"
                  value={rating}
                  onChange={handleRatingChange}
                />
              </div>
              <br />
              <div>
                <Typography gutterBottom>
                  Review:
                </Typography>
                <TextField
                  label="Write your review"
                  multiline
                  rows={4}
                  value={review}
                  onChange={handleReviewChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <br />
              <div>
                <Button variant="contained" color="primary" onClick={handleSubmitReview}>
                  Submit Review
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
  );
}

export default ProductView;
