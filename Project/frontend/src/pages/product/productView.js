import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
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
} from '@mui/material';
import Rating from '@mui/material/Rating';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MyAppBar from '../../components/appBar';


// harcoded 
const Aston = ({ className, divClassName }) => {
  return (
    <div className={`aston ${className}`}>
      <div className={`text-wrapper ${divClassName}`}>Astoné</div>
    </div>
  );
};

function ProductView() {
  const [details, setDetails] = useState([]);

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
        const productService = new ProductService();
        try {
            const res = await productService.getProductById(id);
            console.log(res)
            if (res && res.data) {
                setProduct(res.data);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    fetchProduct();
  }, [id]);

  // const product = {
  //   name: "Men's V neck T-Shirt",
  //   description: 'A stylish and comfortable shirt perfect for the summer.',
  //   price: 'MYR 99.99',
  //   imageUrl: 'https://drive.google.com/file/d/15LaU33HylTqQsSVyDUWNs9E9bEq8h8K-/preview', // Replace with actual image URL
  //   brand: 'Uniqlo',
  //   sizes: [
  //     { name: 'small', code: 'S' },
  //     { name: 'medium', code: 'M' },
  //     { name: 'large', code: 'L' },
  //     { name: 'extra large', code: 'XL' },
  //   ],
  //   colors: [
  //     { name: 'Red', hex: '#FF0000' },
  //     { name: 'Green', hex: '#008000' },
  //     { name: 'Blue', hex: '#0000FF' },
  //     { name: 'Yellow', hex: '#FFFF00' },
  //     { name: 'Orange', hex: '#FFA500' },
  //   ],
  //   tags: ['summer', 'stylish'],
  //   dateAdded: '20/5/2023',
  // };

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

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
    // Logic to handle review submission
    console.log('Rating:', rating);
    console.log('Review:', review);
    // You can add further logic to send the review data to your server
  };

  // hardcoded
  return (
    <div>
      <MyAppBar />
      <Container sx={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper>
              <img
                src={'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/469361/sub/goods_469361_sub14.jpg?width=750'} // Use optional chaining to prevent errors if product is null
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
              {product?.price}
            </Typography>
            <Typography gutterBottom>
              {product?.description}
            </Typography>
            <Typography gutterBottom>
              Brand: {product?.brand}
            </Typography>
            <Typography gutterBottom>
              Date Added: {product?.dateAdded}
            </Typography>
            <Typography gutterBottom>
              {product?.tags.map((tag, index) => (
                <Chip color='primary' key={index} label={tag} style={{ margin: '5px' }}/>
              ))}
            </Typography>
            <div>
              <Typography gutterBottom>
                Size:
              </Typography>
              {product?.sizes.map((sizeOption) => (
                <Chip
                  key={sizeOption.code}
                  label={sizeOption.code}
                  onClick={() => handleSizeChange(sizeOption.code)}
                  color={size === sizeOption.code ? 'primary' : 'default'}
                  style={{ margin: '5px' }}
                />
              ))}
            </div>
            <br />
            <div>
              <Typography gutterBottom>
                Color:
              </Typography>
              {product?.colors.map((colorOption, index) => (
                <Chip
                  key={index}
                  label={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: 8 }}>{colorOption.name}</span>
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
              <Button startIcon={<ShoppingCartIcon />} variant='contained'>
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
  </div>

    // <div>
    //   <header>Astone</header>
    //   <h1>Products</h1>
    //   {/* Map over the details array in state to render product information */}
    //   {details.map((output, id) => (
    //     <div key={id}>
    //       <h2>{`Product name: ${output.name}`}</h2>
    //       <h2>{`Product price: ${output.currency + ' ' + output.price}`}</h2>
    //       <h2>{`Product quantity: ${output.stock}`}</h2>
    //       <br />
    //     </div>
    //   ))}
    // </div>
  );

}

export default ProductView;
