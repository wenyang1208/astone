import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { SellerService } from '../../services/SellerService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const sellerService = new SellerService();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email };
    try {
      // Assuming SellerService has a method for password reset requests
      const response = await sellerService.requestPasswordReset(data);
      console.log('Password reset request successful:', response.data);
      setMessage('If an account with that email exists, you will receive a password reset link.');
      setEmail('');
    } catch (err) {
      console.error('Password reset request failed', err);
      setError('Failed to request password reset. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/loginSeller');
  };

  return (
    <Container maxWidth="lg">
      <Link to="/">
        <Button onClick={handleBack} sx={{ ml: 2, mt: 2 }}>
          <ArrowBackIcon />
        </Button>
      </Link>
      
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
              Forgot Password?
            </Typography>
            <Typography component="body1" sx={{ mb: 1 }}>
              You can reset your password here.
            </Typography>
            {message && (
              <Alert severity="success" sx={{ width: '100%' }}>
                {message}
              </Alert>
            )}
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2, mb: 2, pt:1.2, pb: 1.2, borderRadius: '30px', backgroundColor: '#A020F0',
                    '&:hover': { backgroundColor: '#7D0DC3' }, color: 'white', width: '200px'
                  }}
                >
                  Submit
                </Button>
              </Box>
              <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 1 }}>
                Remembered your password? <Link to="/loginSeller" style={{ textDecoration: 'none', color: 'blue' }}>Log In</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
