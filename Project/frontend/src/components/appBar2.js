import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import backgroundImage from '../assets/mask-group.png'; // If you still want a background image

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

function MyAppBar2() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <IconButton 
          edge="start" 
          color="inherit" 
          onClick={handleBackClick} 
          sx={{ position: 'absolute', left: 16 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography 
          component={Link} 
          to="/" 
          variant="h6" 
          color="inherit" 
          sx={{ textDecoration: 'none' }}
        >
          Astoné
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
}

export default MyAppBar2;
