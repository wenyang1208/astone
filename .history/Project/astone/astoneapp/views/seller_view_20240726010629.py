from django.shortcuts import get_object_or_404, render
import json
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from astoneapp.models.seller import Seller # import model
from rest_framework.response import Response
from astoneapp.serializers.seller_serializer import * # import serializer

from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })
Add URLs:
Add URLs for your API endpoints.
python
Copy code
from django.urls import path
from .views import RegisterView

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
]
Consume API in React:
Modify your React Signup component to send form data to your Django API endpoint.
Updated React Signup Component
jsx
Copy code
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
      // Send form data to the API
      const response = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formValues.email,
          email: formValues.email,
          first_name: formValues.firstName,
          last_name: formValues.lastName,
          password: formValues.password,
        }),
      });

      if (response.ok) {
        // Handle successful signup (e.g., navigate to a different page, show a success message, etc.)
        console.log('Signup successful');
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        // Handle errors from the API
        const errorData = await response.json();
        console.log('Signup failed', errorData);
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








