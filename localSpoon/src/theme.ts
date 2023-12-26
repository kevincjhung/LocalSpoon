// src/theme.ts
import { createTheme } from '@mui/material/styles';
import { purple, green } from '@mui/material/colors';


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
    },
    typography: {
      fontFamily: 'Poppins, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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
    },
    shape: {
      borderRadius: 8,
    }
  });
export default theme;
