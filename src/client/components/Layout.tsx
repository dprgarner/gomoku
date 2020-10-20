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
import multipleRocks from 'data-url:./multiple-rocks.svg';
import singleRock from 'data-url:./single-rock.svg';

const backgroundRocks = {
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  content: '""',
  height: '100%',
  opacity: 0.7,
  pointerEvents: 'none',
  position: 'fixed',
  zIndex: -1,
};

const useStyles = makeStyles((theme) => ({
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

    '&:before': {
      ...backgroundRocks,
      backgroundImage: `url(${multipleRocks})`,
      backgroundPosition: 'bottom left',
      bottom: 0,
      left: 0,
      width: '30vw',
    },

    '&:after': {
      ...backgroundRocks,
      backgroundImage: `url(${singleRock})`,
      backgroundPosition: 'top right',
      backgroundRepeat: 'no-repeat',
      right: '-5vw',
      top: '30vh',
      width: '20vw',
    },
  },
}));

type LayoutProps = {
  children: React.ReactNode;
  userMenu: React.ReactNode;
};

const Layout = ({ children, userMenu }: LayoutProps) => {
  const classes = useStyles();

  return (
    <>
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
    </>
  );
};

export default Layout;
