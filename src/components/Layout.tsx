import * as React from 'react';
import {
  makeStyles,
  AppBar,
  Typography,
  Container,
  Button,
} from '@material-ui/core';
import * as firebase from 'firebase/app';

import { useFirebaseUser } from './firebaseUser';

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
  },

  title: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },

  logOutButton: {
    color: 'white',
    margin: theme.spacing(4),
  },

  boardContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
}));

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();
  const user = useFirebaseUser();

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Typography variant="h3" component="h1" className={classes.title}>
          Gomoku
        </Typography>

        {user && (
          <Button
            variant="outlined"
            size="small"
            color="inherit"
            className={classes.logOutButton}
            onClick={() => firebase.auth().signOut()}
          >
            {`Log out, ${user.displayName || 'friend'}`}
          </Button>
        )}
      </AppBar>

      <Container
        component="main"
        maxWidth="lg"
        className={classes.boardContainer}
      >
        <>{children}</>
      </Container>
    </>
  );
};

export default Layout;
