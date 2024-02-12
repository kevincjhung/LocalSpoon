// src/theme.ts
import { createTheme } from '@mui/material/styles';

// Define your custom theme
const theme = createTheme({
    palette: {
      primary: {
        main: '#E3974F',
      },
      secondary: {
        main: '#D4E685',
      },
      text: {
        primary: '#0A0908',
      },
      background: {
        default: '#F7F5F3',
      },
    },
    typography: {
      fontFamily: 'Poppins, "Segoe UI", Roboto, Arial, sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Poppins';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Poppins-Regular'), url(https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap);
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            border: '1px solid',
          },
        },
      },
    },
  });
export default theme;
