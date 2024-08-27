import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, CssBaseline, Grid, Stepper, Step, StepLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header2 from '../components/header2'; // Adjust the import path if necessary

const defaultTheme = createTheme();

const Signup = () => {
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
  const navigate = useNavigate();

  const steps = ['Let\'s Begin!', 'Optional', 'Almost There!'];

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

  const validateStep = (step) => {
    const errors = {};
    if (step === 0) {
      if (!formValues.firstName) errors.firstName = 'First name is required';
      if (!formValues.lastName) errors.lastName = 'Last name is required';
      if (!formValues.email) errors.email = 'Email is required';
      if (formValues.email !== formValues.emailConfirm) errors.emailConfirm = 'Emails do not match';
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
      console.log()
      // Send form data to the API
      const response = await fetch('http://localhost:8000/seller/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        // Handle successful signup (e.g., navigate to a different page, show a success message, etc.)
        console.log('Signup successful');
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        // Handle errors from the API
        console.log('Signup failed');
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
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                  value={formValues.firstName}
                  onChange={handleChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
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
            />
            <TextField
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
            />
            <Button
              onClick={handleNext}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </Button>
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 1 }}>
              Already have an account? <Link to="/login" style={{ textDecoration: 'none', color: 'blue' }}>Log In</Link>
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
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="tel"
              value={formValues.phone}
              onChange={handleChange}
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
            />
            <Button
              onClick={handleNext}
              fullWidth
              variant="contained"
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
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
    </ThemeProvider>
  );
};

export default Signup;
