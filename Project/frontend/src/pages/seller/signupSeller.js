import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container, Box, TextField, Button, Typography, CssBaseline, Grid, Stepper, Step, StepLabel,
  Select, MenuItem, FormControl, InputLabel, Paper, InputAdornment, IconButton, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

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

const SignupSeller = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    emailConfirm: '',
    gender: '',
    phone: '',
    address: '',
    password: '',
    passwordConfirm: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const steps = ['Basic Info', 'Additional Info', 'Create Password'];

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const cleanedPhone = phone.replace(/\D/g, '');
    return cleanedPhone.length >= 7 && cleanedPhone.length <= 15 && /^([1-9]\d{0,3})?\d+$/.test(cleanedPhone);
  };

  const validateStep = (step) => {
    const errors = {};
    if (step === 0) {
      if (!formValues.firstName) errors.firstName = 'First name is required';
      if (!formValues.lastName) errors.lastName = 'Last name is required';
      if (!formValues.email) {
        errors.email = 'Email is required';
      } else if (!validateEmail(formValues.email)) {
        errors.email = 'Invalid email format';
      }
      if (formValues.email !== formValues.emailConfirm) errors.emailConfirm = 'Emails do not match';
    } else if (step === 1) {
      if (formValues.phone && !validatePhone(formValues.phone)) {
        errors.phone = 'Invalid phone number format';
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
      // Send form data to the API
      // const response = await fetch('http://localhost:8000/seller/register/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formValues),
      // });
      // console.log(response);
      // if (response.ok) {
      //   // Handle successful signup (e.g., navigate to a different page, show a success message, etc.)
      //   console.log('Signup successful');
      //   navigate('/loginseller'); // Redirect to login page after successful signup
      // } else {
      //   // Handle errors from the API
      //   console.log('Signup failed');
      // }
      try {
        const response = await axios.post('https://astone-backend-app.onrender.com/seller/register/', {
          user: {
            username: formValues.email,
            first_name: formValues.firstName,
            last_name: formValues.lastName,
            password: formValues.password,
            email: formValues.email,
          },
          gender: formValues.gender,
          phone_number: formValues.phone,
          address: formValues.address,
          shop_name: `${formValues.firstName}'s shop`,
        });

        if (response.status === 201) {
          console.log('Signup successful');
          navigate('/loginSeller');
        } else {
          console.error('Signup failed', response.data);
        }
      } catch (error) {
        console.error('Signup error', error.response.data);
      }
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  value={formValues.firstName}
                  onChange={handleChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formValues.lastName}
                  onChange={handleChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <StyledTextField
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
              id="emailConfirm"
              label="Confirm Email Address"
              name="emailConfirm"
              autoComplete="email"
              value={formValues.emailConfirm}
              onChange={handleChange}
              error={!!formErrors.emailConfirm}
              helperText={formErrors.emailConfirm}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      case 1:
        return (
          <>
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
            <StyledTextField
              margin="normal"
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="tel"
              value={formValues.phone}
              onChange={handleChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <StyledTextField
              margin="normal"
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="street-address"
              value={formValues.address}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      case 2:
        return (
          <>
            <StyledTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={formValues.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
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
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="passwordConfirm"
              autoComplete="new-password"
              value={formValues.passwordConfirm}
              onChange={handleChange}
              error={!!formErrors.passwordConfirm}
              helperText={formErrors.passwordConfirm}
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: '#e7def3', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
          <Link to="/">
            <IconButton color="primary">
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </Box>
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={12} sm={8} md={6}>
            <StyledPaper>
              <Typography component="h1" variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
                Seller Sign Up
              </Typography>
              <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%', mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                    sx={{
                      py: 1.5, px: 4, borderRadius: '30px', 
                      backgroundColor: 'primary.main',
                      '&:hover': { backgroundColor: 'primary.dark' },
                      fontWeight: 'bold',
                    }}
                  >
                    {activeStep === steps.length - 1 ? 'Create Account' : 'Next'}
                  </Button>
                </Box>
              </Box>
              {activeStep === 0 && (
                <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                  Already have an account? <Link to="/loginSeller" style={{ textDecoration: 'none', color: 'primary.main' }}>Log In</Link>
                </Typography>
              )}
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignupSeller;