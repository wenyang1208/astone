import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';


const Sell = () => {
  
  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h1" sx={{ color: '#333', fontSize: '2rem', marginBottom: '20px' }}>
        Sell
      </Typography>
      <Link to="/products" style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={{ backgroundColor: '#A020F0', '&:hover': { backgroundColor: '#7D0DC3' }, color: 'white' }}>
          Log in
        </Button>
      </Link>
    </Box>
  );
};

export default Sell;