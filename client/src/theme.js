import { createTheme } from '@mui/material';

// Define your custom theme (you can modify the colors, typography, etc.)
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',  // Primary color
    },
    secondary: {
      main: '#f50057',  // Secondary color
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '2rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  spacing: 4,  // Global spacing (e.g., margins, padding)
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: '10px',
          boxSizing: 'border-box',
        },
      },
    },
  },
});

export default theme;
