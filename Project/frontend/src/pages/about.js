import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import MyAppBar2 from '../components/appBar2'; // Importing MyAppBar2
import Footer2 from '../components/footer2'; // Importing Footer2
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {Box, Container, Typography} from '@mui/material';

const defaultTheme = createTheme();

const About = () => {

  return (
 
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <MyAppBar2 />
  
      <Container style={{ textAlign: 'center', padding: '70px 0'}}>
        <Box component="header"
          sx={{
            py: { xs: 5, sm: 8, md: 3 }, // responsive padding
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[250]
                : theme.palette.grey[800],
          }}>
          <Typography variant="h4" gutterBottom>
          Astone
          </Typography>
          <Typography variant="body1" paragraph>
            Astone is your ultimate destination for fashion, offering a diverse range of styles for everyone.
            From casual wear to elegant outfits, we ensure that you find the perfect fit for every occasion.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Why Choose Astone?
          </Typography>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>
              <Typography variant="body1">✨ Variety: Explore countless choices tailored to all tastes and styles.</Typography>
            </li>
            <li>
              <Typography variant="body1">💎 Quality: We source only the finest materials to keep you looking great and feeling comfortable.</Typography>
            </li>
            <li>
              <Typography variant="body1">💰 Affordability: Trendy fashion doesn't have to break the bank. Enjoy stylish options at unbeatable prices!</Typography>
            </li>
          </ul>
        </Box>
      </Container>

      <Footer2 />
    </ThemeProvider>
  );
};

export default About;