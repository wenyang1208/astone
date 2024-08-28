import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from '../assets/mask-group.png'; // Background image if needed

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  left: 0,
  right: 0,
  margin: 0,
  padding: 0,
  position: 'fixed', // Fixed positioning to ensure it stretches properly
}));

function MyAppBar2() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <StyledAppBar>
      <Toolbar sx={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleBackClick}
          sx={{ position: 'absolute', left: 16, color: 'white' }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          color="inherit"
          sx={{ textDecoration: 'none', color: 'white' }}
        >
          Astoné
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
}

export default MyAppBar2;
