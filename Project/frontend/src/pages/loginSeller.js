import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, CssBaseline, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header2 from '../components/header2'; // Adjust the import path if necessary
import { SellerService } from '../services/SellerService'; // Adjust the import path if necessary

const defaultTheme = createTheme();

const Login = () => {

  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const sellerService = new SellerService();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { username, password };
    const response = await sellerService.loginSeller(data);
    if (response) {
      console.log('Login successful:', response.data);
      // Handle successful login (e.g., redirect to dashboard, store token, etc.)
    } else {
      console.error('Login failed');
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
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={username}
                  onChange={(e) => setEmail(e.target.value)}
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
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

export default Login;
