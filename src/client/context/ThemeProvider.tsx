import * as React from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

type ThemeProviderProps = {
  children: React.ReactNode;
};

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Zilla Slab", serif',
  },
  palette: {
    primary: {
      light: '#C4773D',
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

const ThemeProvider = ({ children }: ThemeProviderProps) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

export default ThemeProvider;
