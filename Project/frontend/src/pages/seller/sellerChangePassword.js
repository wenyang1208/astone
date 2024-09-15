import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { SellerService } from '../../services/SellerService';

const ChangePassword = () => {
  const { id } = useParams();
  const [password, setpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const sellerService = new SellerService();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    
    console.log(id);
    const data = { password };
    try {
      // Assuming SellerService has a method for changing passwords
      const response = await sellerService.changePassword(id, data);
      console.log('Password change successful:', response.data);
      setMessage('Your password has been changed successfully.');
      setpassword('');
      setConfirmPassword('');
      setTimeout(() => {
        navigate('/loginSeller');
      }, 3000);
    } catch (err) {
      console.error('Password change failed', err);
      setError('Failed to change password. Please try again.');
    }
  };


  return (
    <Container maxWidth="lg">
      
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
              Change Password
            </Typography>
            <Typography component="body1" sx={{ mb: 1 }}>
              Update your password here.
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
                type="password"
                id="password"
                label="New Password"
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                id="confirmPassword"
                label="Confirm New Password"
                name="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChangePassword;
