import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, CssBaseline, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header2 from '../../components/header2'; // Adjust the import path if necessary

const defaultTheme = createTheme();

const Sell = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h1" sx={{ color: '#333', fontSize: '2rem', marginBottom: '20px' }}>
        Get Started
      </Typography>
      <Link to="/loginSeller" style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={{ backgroundColor: '#A020F0', '&:hover': { backgroundColor: '#7D0DC3' }, color: 'white' }}>
          Log in
        </Button>
      </Link>
    </Box>

  );
};



export default Sell;