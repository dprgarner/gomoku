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
      main: '#FFDD8F',
    },
    background: {
      default: '#fbe6da',
      paper: '#fff8f5',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2),
  },
  paper: {
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

      <Container component="main" maxWidth="md">
        <Paper className={classes.paper} elevation={3}>
          <GomokuClient />
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
