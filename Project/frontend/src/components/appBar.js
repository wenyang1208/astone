import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import backgroundImage from '../assets/mask-group.png'

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

function MyAppBar() {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }} variant="h6">
            Astone       
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Shop</Button>
        <Button color="inherit">Contact</Button>
        <IconButton color="inherit">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
}

export default MyAppBar;