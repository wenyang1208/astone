import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, CssBaseline, Grid, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SellerService } from '../../services/SellerService';
import Header2 from '../../components/header2'; // Adjust the import path if necessary
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constant';

const defaultTheme = createTheme();

const LoginSeller = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const sellerService = new SellerService();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { username, password };
    const response = await sellerService.loginSeller(data);
    if (response) {
      console.log('Login successful:', response.data);
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      navigate('/productlist');
      // Handle successful login 
    } else {
      console.error('Login failed');
      setError('Incorrect username or password. Please try again.');
      setUsername('');
      setPassword('');
      // Handle login failure (e.g., show error message)
    }
  };

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
              <Typography component="h1" variant="h4" sx={{ mb: 1 }}>
                Log In
              </Typography>
              {error && (
                <Alert severity="error" sx={{ width: '100%' }}>
                  {error}
                </Alert>
              )}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user"
                  label="Email Address"
                  name="user"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2, mb: 2, pt:1.2, pb: 1.2, borderRadius: '30px', backgroundColor: '#A020F0',
                      '&:hover': { backgroundColor: '#7D0DC3' }, color: 'white', width: '30%'
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 1 }}>
                  Don't have an account? <Link to="/signupSeller" style={{ textDecoration: 'none', color: 'blue' }}>Sign Up</Link>
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                  <Link to="/forgotpassword" style={{ textDecoration: 'none', color: 'gray' }}>Forgot Password?</Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default LoginSeller;
