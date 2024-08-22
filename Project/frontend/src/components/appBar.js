import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
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

const sections = [
  { title: 'Home', url:'/'},
  { title: 'Men', url: '/men' },
  { title: 'Women', url: '/women' },
  { title: 'Unisex', url: '/unisex' },
  { title: 'Compare', url: '/compare' },  
  { title: 'Support', url: '/support' },
];

function MyAppBar() {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }} variant="h6">
          Astoné       
        </Typography>
        {sections.map((section, index) => (
          <Link
            key={index}
            to={section.url}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              variant="body2"
              sx={{ p: 1, flexShrink: 0 }}
            >
              {section.title}
            </Typography>
          </Link>
        ))}
        <IconButton color="inherit">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
}

export default MyAppBar;