import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Zilla Slab", serif',
  },
  palette: {
    primary: {
      main: '#7A4115',
    },
    secondary: {
      main: '#EEBB1C',
    },
    background: {
      default: '#fef9ec',
      paper: '#fbe7b1',
    },
  },
});

export default theme;
