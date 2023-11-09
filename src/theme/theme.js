import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#19857b',
      contrastText: '#000',
    },
    error: {
      main: '#ff3d00',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff9800', // orange
      contrastText: '#000',
    },
    info: {
      main: '#2196f3', // light blue
      contrastText: '#fff',
    },
    success: {
      main: '#4caf50', // green
      contrastText: '#000',
    },
  },
});

export default theme;
