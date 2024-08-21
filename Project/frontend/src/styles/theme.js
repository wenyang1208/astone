import { stepContentClasses } from '@mui/material';
import { createTheme } from '@mui/material'

export const Colors = {
    primary: "#551e86",
    secondary: "#ffb0e3",
    success: "#00ff85",
    info: "#6fb6c5",
    danger: "#e74c3c",
    verified: "#fff50c",
    warning: "#ff9900",
    accent: "#603f70",
    background: "#ffffff",
    text: "#000000",
    border: "#7235a3",
    // Add more colors ass needed
};

const theme = createTheme({
    palette: {
        primary: {
          main: '#551e86',
        },
        secondary: {
          main: '#ff47bd',
        },
        info: {
          main: '#6fb6c5',
        },
        success: {
            main: '#00ff85',
          },
        error: {
          main: '#ff1200',
        },
      },
  });

export default theme;