import React, { useState, useEffect } from 'react';
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
  Chip
} from '@mui/material';
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

  useEffect(() => {
    const productService = new ProductService();

    // Call the getProducts method from ProductService
    productService.getProducts()
      .then(res => {
        console.log(res);
        setDetails(res.data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, []);

  const product = {
    name: 'Stylish Jacket',
    description: 'A stylish and comfortable jacket perfect for the winter season.',
    price: '$99.99',
    imageUrl: 'https://example.com/jacket.jpg', // Replace with actual image URL
    brand: 'FashionBrand',
    sizes: [
      { name: 'small', code: 'S' },
      { name: 'medium', code: 'M' },
      { name: 'large', code: 'L' },
      { name: 'extra large', code: 'XL' },
    ],
    colors: [
      { name: 'Red', hex: '#FF0000' },
      { name: 'Green', hex: '#008000' },
      { name: 'Blue', hex: '#0000FF' },
      { name: 'Yellow', hex: '#FFFF00' },
      { name: 'Orange', hex: '#FFA500' },
    ],
    tags: ['winter', 'jacket', 'stylish'],
    brand: 'FashionBrand',
    dateAdded: '2023-05-20',
  };

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSizeChange = (value) => {
    setSize(value);
  };

  const handleColorChange = (value) => {
    setColor(value);
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
                src={product?.imageUrl} // Use optional chaining to prevent errors if product is null
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
                <Chip variant="outlined" key={index} label={tag} style={{ margin: '5px' }}/>
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
                  onClick={() => setColor(colorOption.hex)}
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