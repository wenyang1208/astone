import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Drawer, List, ListItem, ListItemText, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import backgroundImage from '../assets/mask-group.png';
import { OrderService } from '../services/OrderService';
import LoginButton from './loginButton';  // Import the LoginButton component

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const sections = [
  { title: 'Home', url: '/' },
  { title: 'Men', url: '/men' },
  { title: 'Women', url: '/women' },
  { title: 'Unisex', url: '/unisex' },
  { title: 'Compare', url: '/compare' },
  { title: 'Support', url: '/support' },
];

function MyAppBar() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchCartItems = async () => {
    const orderService = new OrderService();
    try {
      const res = await orderService.getCart();
      if (res && res.data) {
        const cartItems = res.data.cart_items;
        const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartItemCount(itemCount);
        setCartItems(cartItems);
        setTotalPrice(res.data.total_price);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleCartClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
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
            <LoginButton />  {/* Use the LoginButton component here */}
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
        <Container sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Your Cart
          </Typography>
          <List>
            {cartItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${item.product} - ${item.quantity} x ${item.price}`}
                  secondary={`Total: ${item.total_price}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" gutterBottom>
            Total Price: {totalPrice}
          </Typography>
          <Button variant="contained" color="primary" fullWidth>
            Checkout
          </Button>
        </Container>
      </Drawer>
    </>
  );
}

export default MyAppBar;