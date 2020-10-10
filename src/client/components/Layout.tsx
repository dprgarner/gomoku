import * as React from 'react';
import { makeStyles, AppBar, Typography, Container } from '@material-ui/core';

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
    <>
      <AppBar position="static" className={classes.appBar}>
        <Typography variant="h3" component="h1" className={classes.title}>
          Gomoku
        </Typography>

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
