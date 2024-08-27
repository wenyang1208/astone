import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" sx={{paddingLeft: '30px' }}>
      {'Copyright © '}
      {/* <Link color="inherit" href="https://mui.com/"> */}
      {/* </Link>{' '} */}
      {new Date().getFullYear()}
      {' '}
      Astone Malaysia. ALL RIGHTS RESERVED
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>

        <CssBaseline />

        <Box
          component="footer"
          sx={{
            py: { xs: 5, sm: 8, md: 3 }, // responsive padding
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
        <Grid container spacing={2} justifyContent="space-around" marginBottom='50px' marginTop= '10px'>
            <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom
                sx={{
                    textAlign: {
                        xs: 'left', // Center text on extra-small screens
                        sm: 'left', // Align text to the center on small and larger screens
                        fontWeight: 'bold',
                    },
                    }}
                >
                About Astoné
                </Typography>
                <Link href="/about" color="inherit" >
                About Us
                </Link>
            </Grid>

            <Grid item xs={12} md={3}>
                <Typography variant="h6" gutterBottom
                sx={{
                    textAlign: {
                        xs: 'left', // Center text on extra-small screens
                        sm: 'left', // Align text to the center on small and larger screens
                        fontWeight: 'bold',
                    },
                    }}>
                Help
                </Typography>
                <Link href="#" color="inherit" display="block">
                FAQ
                </Link>
                <Link href="#" color="inherit" display="block">
                Return Policy
                </Link>
                <Link href="#" color="inherit" display="block">
                Privacy Policy
                </Link>
                <Link href="#" color="inherit" display="block">
                Accessibility
                </Link>
            </Grid>

            <Grid item xs={12} md={3}>
                <Typography variant="h6"  
                sx={{
                    textAlign: {
                        xs: 'left', // Center text on extra-small screens
                        sm: 'left', // Align text to the center on small and larger screens
                        fontWeight: 'bold',
                    },
                    }}gutterBottom>
                Account
                </Typography>
                <Link href="#" color="inherit" display="block">
                Membership
                </Link>
                <Link href="#" color="inherit" display="block">
                Profile
                </Link>
                <Link href="#" color="inherit" display="block">
                Coupons
                </Link>
            </Grid>
        </Grid>

        <Grid item xs={12} md={5} 
        container direction="column" alignItems="start" justifyContent= "flex-end">
                {/* <Container 
                maxWidth="sm"
                sx={{
                    py: 2,
                    textAlign: "center",
                }}
                > */}
                <Typography variant="body1" 
                    sx={{
                    textAlign: {
                        xs: 'center', // Center text on extra-small screens
                        sm: 'center', // Align text to the center on small and larger screens
                        fontWeight: 'bold',
                        paddingLeft: '30px',
                    },
                    }}
                >
                    Malaysia/English
                </Typography>
                    <Copyright />
                {/* </Container> */}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

{/* <Container maxWidth="sm"> */}
{/* </Container> */}