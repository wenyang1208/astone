import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, CssBaseline, Grid, Stepper, Step, StepLabel, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
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
      default: '#F0E6FA', // White background
    },
    text: {
      primary: '#000', // Black text
    },
  },
});

const Signup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    email2: '',
    gender: '',
    phone_number: '',
    address: '',
    password: '',
    passwordConfirm: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [fade, setFade] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const steps = ['Let\'s Begin!', 'Optional', 'Almost There!'];

  useEffect(() => {
    if (location.state?.accountCreationFailed) {
      setShowErrorAlert(true);
      const fadeTimer = setTimeout(() => {
        setFade(false);
      }, 4000); // Start fading after 4 seconds

      const hideTimer = setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000); // Hide alert after 5 seconds

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [location.state?.accountCreationFailed]);

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(String(phone));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    
    // Clear previous errors
    setFormErrors({ ...formErrors, [name]: '' });

    // Validate email
    if (name === 'email' && value && !validateEmail(value)) {
      setFormErrors(prev => ({ ...prev, email: 'Invalid email format' }));
    }

    // Validate phone number
    if (name === 'phone_number' && value && !validatePhone(value)) {
      setFormErrors(prev => ({ ...prev, phone_number: 'Invalid phone number format' }));
    }
  };

  const validateStep = (step) => {
    const errors = {};
    if (step === 0) {
      if (!formValues.first_name) errors.first_name = 'First name is required';
      if (!formValues.last_name) errors.last_name = 'Last name is required';
      if (!formValues.email) {
        errors.email = 'Email is required';
      } else if (!validateEmail(formValues.email)) {
        errors.email = 'Invalid email format';
      }
      if (formValues.email !== formValues.email2) errors.email2 = 'Emails do not match';
    } else if (step === 1) {
      if (formValues.phone_number && !validatePhone(formValues.phone_number)) {
        errors.phone_number = 'Invalid phone number format';
      }
    } else if (step === 2) {
      if (!formValues.password) errors.password = 'Password is required';
      if (formValues.password !== formValues.passwordConfirm) errors.passwordConfirm = 'Passwords do not match';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateStep(2)) {
      try {
        const userService = new UserService();
        const response = await userService.register(
          formValues.email,
          formValues.first_name,
          formValues.last_name,
          formValues.gender,
          formValues.phone_number,
          formValues.address,
          formValues.password
        );
  
        if (response && response.status === 201) {
          console.log('Signup successful');
          navigate('/login', { state: { accountCreated: true } });
        } else {
          const errorMessage = response?.data?.message || 'Failed to create account.';
          console.error('Signup failed:', errorMessage);
          navigate('/signup', { state: { accountCreationFailed: true } });
        }
      } catch (error) {
        console.error('An error occurred:', error);
        navigate('/signup', { state: { accountCreationFailed: true } });
      }
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  name="first_name"
                  autoComplete="given-name"
                  autoFocus
                  value={formValues.first_name}
                  onChange={handleChange}
                  error={!!formErrors.first_name}
                  helperText={formErrors.first_name}
                  InputLabelProps={{ style: { color: 'text.primary' } }} // Black label
                  InputProps={{ style: { color: 'text.primary' } }} // Black text
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  value={formValues.last_name}
                  onChange={handleChange}
                  error={!!formErrors.last_name}
                  helperText={formErrors.last_name}
                  InputLabelProps={{ style: { color: 'text.primary' } }} // Black label
                  InputProps={{ style: { color: 'text.primary' } }} // Black text
                />
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formValues.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              InputLabelProps={{ style: { color: 'text.primary' } }}
              InputProps={{ style: { color: 'text.primary' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email2"
              label="Confirm Email Address"
              name="email2"
              autoComplete="email"
              value={formValues.email2}
              onChange={handleChange}
              error={!!formErrors.email2}
              helperText={formErrors.email2}
              InputLabelProps={{ style: { color: 'text.primary' } }}
              InputProps={{ style: { color: 'text.primary' } }}
            />
            <Button
              onClick={handleNext}
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </Button>
            <Typography variant="body2" color="text.primary" align="center" sx={{ mb: 1 }}>
              Already have an account? <Link to="/login" style={{ textDecoration: 'none', color: purpleTheme.palette.primary.main }}>Log In</Link>
            </Typography>
          </Box>
        );
      case 1:
        return (
          <Box component="form" sx={{ mt: 1 }}>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={formValues.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              id="phone_number"
              label="Phone Number"
              name="phone_number"
              autoComplete="tel"
              value={formValues.phone_number}
              onChange={handleChange}
              error={!!formErrors.phone_number}
              helperText={formErrors.phone_number}
              InputLabelProps={{ style: { color: 'text.primary' } }}
              InputProps={{ style: { color: 'text.primary' } }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="street-address"
              value={formValues.address}
              onChange={handleChange}
              InputLabelProps={{ style: { color: 'text.primary' } }} // Black label
              InputProps={{ style: { color: 'text.primary' } }} // Black text
            />
            <Button
              onClick={handleNext}
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </Button>
            <Button
              onClick={handleBack}
              fullWidth
              variant="text"
              sx={{ mb: 2 }}
            >
              Back
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formValues.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputLabelProps={{ style: { color: 'text.primary' } }} // Black label
              InputProps={{ style: { color: 'text.primary' } }} // Black text
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
              id="passwordConfirm"
              autoComplete="new-password"
              value={formValues.passwordConfirm}
              onChange={handleChange}
              error={!!formErrors.passwordConfirm}
              helperText={formErrors.passwordConfirm}
              InputLabelProps={{ style: { color: 'text.primary' } }} // Black label
              InputProps={{ style: { color: 'text.primary' } }} // Black text
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
            <Button
              onClick={handleBack}
              fullWidth
              variant="text"
              sx={{ mb: 2 }}
            >
              Back
            </Button>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      <MyAppBar2 /> {/* Use MyAppBar2 */}
      <Container maxWidth="lg" sx={{ pt: 8 }}>
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
          <Grid item xs={12} sm={8} md={5}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#fff', // White background
                borderRadius: '8px', // Smooth corners
                boxShadow: 3, // Subtle shadow
                p: 3,
              }}
            >
              <Typography variant="h4" component="h1" color="text.primary" sx={{ mb: 3 }}>
                Join Astoné
              </Typography>
              <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 2 }}>
                {steps.map((label, index) => (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {getStepContent(activeStep)}
            </Box>
          </Grid>
        </Grid>
      </Container>
      {showErrorAlert && (
        <Alert severity="error" sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 'auto',
          opacity: fade ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
          zIndex: 1300, // Ensure the alert is above other content
        }}>
          Failed to create account.
        </Alert>
      )}
    </ThemeProvider>
  );
};

export default Signup;
