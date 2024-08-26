import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, CssBaseline, Grid, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header2 from '../components/header2'; // Adjust the import path if necessary

const defaultTheme = createTheme();

const Login = () => {
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (location.state?.accountCreated) {
      setShowAlert(true);
      const fadeTimer = setTimeout(() => {
        setFade(false);
      }, 4000); // Start fading after 4 seconds
      
      const hideTimer = setTimeout(() => {
        setShowAlert(false);
      }, 5000); // Hide alert after 5 seconds

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [location.state?.accountCreated]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header2 />
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
          <Grid item xs={12} sm={8} md={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 1 }}>
                  Don't have an account? <Link to="/signup" style={{ textDecoration: 'none', color: 'blue' }}>Sign Up</Link>
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                  <Link to="/forgotpassword" style={{ textDecoration: 'none', color: 'gray' }}>Forgot Password?</Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {showAlert && (
          <Alert
            severity="success"
            sx={{
              position: 'fixed',
              top: 20,
              right: 20,
              width: 'fit-content',
              padding: '8px 24px',
              textAlign: 'center',
              opacity: fade ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            Account successfully created! Log in.
          </Alert>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Login;
