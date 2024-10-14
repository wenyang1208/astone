import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Container, Box, TextField, Button, Typography, Grid, Alert, Paper, 
  InputAdornment, IconButton, Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SellerService } from '../../services/SellerService';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constant';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
  borderRadius: '15px',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const LoginSeller = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      navigate('/sellerProfile');
    } else {
      console.error('Login failed');
      setError('Incorrect username or password. Please try again.');
      setPassword('');
    }
  };

  const handleBack = () => {
    navigate('/sell');
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ 
      backgroundColor: '#e7def3', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Container maxWidth="lg">
        <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
          <Link to="/">
            <IconButton onClick={handleBack} color="primary">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </Box>
        
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={12} sm={8} md={5}>
            <StyledPaper elevation={3}>
              <Typography component="h1" variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
                Seller Login
              </Typography>
              {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                  {error}
                </Alert>
              )}
              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <StyledTextField
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledTextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3, mb: 2, py: 1.5, borderRadius: '30px', 
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.dark' },
                    fontWeight: 'bold',
                  }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                  <Grid item>
                    <Link to="/SellerForgotPassword" style={{ textDecoration: 'none', color: 'primary.main' }}>
                      <Typography variant="body2">Forgot Password?</Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signupSeller" style={{ textDecoration: 'none', color: 'primary.main' }}>
                      <Typography variant="body2">Don't have an account? Sign Up</Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginSeller;