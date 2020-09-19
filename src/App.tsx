import * as React from 'react';
import {
  makeStyles,
  AppBar,
  Typography,
  Container,
  Paper,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import GomokuClient from './GomokuClient';

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

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2),
  },

  boardContainer: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static">
        <Typography variant="h3" className={classes.title}>
          Gomoku
        </Typography>
      </AppBar>

      <Container
        component="main"
        maxWidth="md"
        className={classes.boardContainer}
      >
        <GomokuClient />
      </Container>
    </ThemeProvider>
  );
};

export default App;
