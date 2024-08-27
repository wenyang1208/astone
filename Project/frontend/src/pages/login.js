import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, CssBaseline, Grid, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyAppBar2 from '../components/appBar2'; // Import MyAppBar2
import { UserService } from '../services/UserService';

// Define a purple theme with black text
const purpleTheme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a', // Purple color
    },
    secondary: {
      main: '#ab47bc', // Light purple color
    },
    background: {
      default: '#F0E6FA', // Light pink background
    },
    text: {
      primary: '#000', // Black text
    },
  },
});

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.email) errors.email = 'Email is required';
    if (!formValues.password) errors.password = 'Password is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const userService = new UserService();
      const response = await userService.login(formValues.email, formValues.password);

      if (response && response.status === 200) {
        // Save email to localStorage
        localStorage.setItem('userEmail', formValues.email);
        // Navigate to another page, e.g., dashboard
        navigate('/');
      } else {
        setFormErrors({ ...formErrors, login: 'Invalid email or password' });
      }
    }
  };

  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      <MyAppBar2 /> {/* Use MyAppBar2 instead of Header2 */}
      <Container maxWidth="xs" sx={{ mt: 4, mb: 4 }}> {/* Fit the width and add some top and bottom margin */}
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 4,
                  borderRadius: 2,
                  boxShadow: 3,
                  bgcolor: '#fff', // White background for the main component area
                  width: '100%',
                  maxWidth: 400,
                }}
              >
                <Typography component="h1" variant="h5" sx={{ color: 'text.primary' }}>
                  Log In
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
                    value={formValues.email}
                    onChange={handleChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    InputLabelProps={{ style: { color: 'text.primary' } }} // Black label
                    InputProps={{ style: { color: 'text.primary' } }} // Black text
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
                    value={formValues.password}
                    onChange={handleChange}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    InputLabelProps={{ style: { color: 'text.primary' } }} // Black label
                    InputProps={{ style: { color: 'text.primary' } }} // Black text
                  />
                  {formErrors.login && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {formErrors.login}
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Typography variant="body2" color="text.primary" align="center" sx={{ mb: 1 }}>
                    Don't have an account? <Link to="/signup" style={{ textDecoration: 'none', color: purpleTheme.palette.primary.main }}>Sign Up</Link>
                  </Typography>
                  <Typography variant="body2" color="text.primary" align="center">
                    <Link to="/forgotpassword" style={{ textDecoration: 'none', color: 'gray' }}>Forgot Password?</Link>
                  </Typography>
                </Box>
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
              bgcolor: '#fff', // White background for the alert
              color: 'text.primary' // Black text
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
