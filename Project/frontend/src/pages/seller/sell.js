import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import MyAppBar2 from '../../components/appBar2'; // Import MyAppBar component

const theme = createTheme({
  palette: {
    primary: {
      main: '#B4A7D6',
    },
    background: {
      default: '#F0E6FA', // Light purple background color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
        },
      },
    },
  },
});

function Sell() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default' }}>
        {/* Use MyAppBar at the top */}
        <MyAppBar2 />

        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: 'background.default',
            pt: 10, // Add padding to create space between AppBar and content
          }}
        >
          <Container component="main" maxWidth="sm">
            <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: '15px' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <StorefrontOutlinedIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                <Typography component="h1" variant="h4" sx={{ mt: 2, mb: 3, color: 'text.primary' }}>
                  Start Selling Today
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
                  Join our platform and turn your passion into profit
                </Typography>
                <Link to="/loginSeller" style={{ textDecoration: 'none', width: '100%' }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    Get Started
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Sell;
