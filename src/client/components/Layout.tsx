import * as React from 'react';
import {
  makeStyles,
  AppBar,
  Link,
  Typography,
  Container,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import Logo from './Logo.svg';

const useStyles = makeStyles((theme) => ({
  layoutContainer: {
    position: 'relative',
    minWidth: '100vw',
    minHeight: '100vh',
  },

  appBar: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
  },

  title: {
    flexGrow: 1,
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },

  logo: {
    flex: '0 1 40px',
    marginRight: theme.spacing(2),
    height: 40,
  },

  boardContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
}));

type LayoutProps = {
  children: React.ReactNode;
  userMenu: React.ReactNode;
};

const Layout = ({ children, userMenu }: LayoutProps) => {
  const classes = useStyles();

  return (
    <div className={classes.layoutContainer}>
      <AppBar position="static" className={classes.appBar}>
        <Link
          color="inherit"
          underline="none"
          component={RouterLink}
          to="/"
          className={classes.title}
        >
          <Logo className={classes.logo} />
          <Typography variant="h3" component="h1">
            Gomoku
          </Typography>
        </Link>

        {userMenu}
      </AppBar>

      <Container
        component="main"
        maxWidth="lg"
        className={classes.boardContainer}
      >
        <>{children}</>
      </Container>
    </div>
  );
};

export default Layout;
