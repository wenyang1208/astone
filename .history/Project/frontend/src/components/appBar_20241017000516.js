import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Badge, Drawer, List, ListItem, ListItemText, Button, Container, Box
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import backgroundImage from '../assets/mask-group.png';
import { OrderService } from '../services/OrderService';
import LoginButton from './loginButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { UserService } from '../services/UserService';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

// Sections displayed in the main navigation bar
const sections = [
  { title: 'Home', url: '/' },
  { title: 'Men', url: '/men' },
  { title: 'Women', url: '/women' },
  { title: 'Unisex', url: '/unisex' },
  { title: 'Compare', url: '/compare' },
  { title: 'Sell', url: '/sell' }, // 'Sell' is included in the main navigation bar
];

function MyAppBar() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const navigate = useNavigate();

  const BASE_URL = 'http://localhost:8000';

  const fetchCartItems = async () => {
    const orderService = new OrderService();
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userEmail) {
        console.error('User email not found. Please log in.');
        return;
    }

    try {
        const res = await orderService.getCart(userEmail);
        if (res && res.data) {
            const cartItems = res.data.cart_items;
            const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
            setCartItemCount(itemCount);
            setCartItems(cartItems);
            setTotalPrice(res.data.total_price.toFixed(2));
        }
    } catch (error) {
        console.error('Error fetching cart items:', error);
    }
  };

  const fetchUserPoints = async () => {
    const orderService = new OrderService();
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userEmail) {
        console.error('User email not found. Please log in.');
        return;
    }

    try {
      const res = await new UserService().get_user_details(userEmail);
      if (res && res.data) {
          console.log(res);
          setUserPoints(res.data.points);
      }
    } catch (error) {
      console.error('Error fetching user points:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchUserPoints();
  }, []);

  const handleCartClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleIncrement = async (item) => {
    const orderService = new OrderService();
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userEmail) {
        console.error('User email not found. Please log in.');
        return;
    }

    try {
      await orderService.updateCartItem(item.product_id, item.size, item.color, item.quantity + 1, userEmail);
      fetchCartItems();

    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleDecrement = async (item) => {
    const orderService = new OrderService();
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userEmail) {
        console.error('User email not found. Please log in.');
        return;
    }

    try {
      await orderService.updateCartItem(item.product_id, item.size, item.color, item.quantity - 1, userEmail);
      fetchCartItems();
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            component={Link} 
            to="/" 
            variant="h6" 
            color="inherit" 
            sx={{ textDecoration: 'none' }}
          >
            Astoné
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {sections.map((section, index) => (
              <Link
                key={index}
                to={section.url}
                style={{ textDecoration: 'none', color: 'inherit', margin: '0 15px' }}
              >
                <Typography
                  variant="body2"
                  sx={{ p: 1, flexShrink: 0 }}
                >
                  {section.title}
                </Typography>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={cartItemCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <LoginButton /> {/* Use the LoginButton component here */}
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Container sx={{ width: 500, padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Your Cart
          </Typography>
          <List>
            {cartItems.map((item, index) => {
              const colors = item.color;
              const sizes = item.size;
              const selectedColor = colors;
              const selectedSize = sizes;
              const imageUrl = (item?.product?.images && item?.product?.images.length > 0) 
                ? `${BASE_URL}${item.product.images[0].image_url}` 
                : 'https://via.placeholder.com/140';

              return (
                <ListItem key={index}>
                  <img src={imageUrl} alt={item.product.name} style={{ width: 50, height: 50, marginRight: 10 }} />
                  <ListItemText
                    primary={`${item.product.name} - ${item.quantity} x MYR ${item.price.toFixed(2)}`}
                    secondary={`Total: MYR ${item.total_price.toFixed(2)}`}
                  />
                  {selectedColor && (
                    <Box style={{ backgroundColor: selectedColor, width: '20px', height: '20px', marginRight: '5px' }} />
                  )}
                  {selectedSize && (
                    <Typography variant="body2" sx={{ marginRight: '5px' }}>
                      {selectedSize}
                    </Typography>
                  )}
                  <Box>
                    <IconButton onClick={() => handleIncrement(item)}>
                      <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDecrement(item)}>
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              );
            })}
          </List>
          <Typography variant="h6" gutterBottom>
            Total Price: {"MYR " + totalPrice}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCheckout}
            disabled={cartItemCount === 0}
          >
            Checkout
          </Button>
        </Container>
      </Drawer>
    </>
  );
}

export default MyAppBar;
