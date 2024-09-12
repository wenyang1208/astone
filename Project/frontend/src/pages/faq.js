import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CssBaseline,
  Container,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MyAppBar2 from '../components/appBar2'; // Importing MyAppBar2

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
      default: '#f4f4f4', // Light grey background
    },
    text: {
      primary: '#000', // Black text
    },
  },
});

const FAQ = () => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      <MyAppBar2 /> {/* AppBar Component */}
      {/* Add padding to create space below the AppBar */}
      <Box sx={{ paddingTop: '80px', backgroundColor: purpleTheme.palette.background.default, minHeight: '100vh' }}>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" gutterBottom color="textPrimary">
            Frequently Asked Questions
          </Typography>
          {/* FAQ Accordions */}
          {[1, 2, 3, 4, 5].map((num) => (
            <Accordion
              key={num}
              sx={{
                mb: 2,
                borderRadius: '8px', // Rounding corners
                '&:before': {
                  display: 'none', // Remove the default background before expand effect
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: purpleTheme.palette.primary.main }} />}
                aria-controls={`panel${num}-content`}
                id={`panel${num}-header`}
                sx={{
                  borderRadius: '8px', // Also apply to summary for full effect
                }}
              >
                <Typography color="textPrimary">Question {num}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="textPrimary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FAQ;
