import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, CssBaseline, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header2 from '../components/header2'; // Adjust the import path if necessary

const defaultTheme = createTheme();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Mock authentication function
    const mockAuthenticate = (email, password) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email === 'test@example.com' && password === 'password') {
            resolve('Authenticated');
          } else {
            reject('Invalid credentials');
          }
        }, 1000);
      });
    };

    try {
      await mockAuthenticate(email, password);
      history.push('/account'); // Navigate to the account page on successful login
    } catch (error) {
      alert(error); // Display error message on invalid credentials
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
              <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
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
                  onChange={handlePasswordChange}
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
