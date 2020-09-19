import * as React from 'react';
import { makeStyles, AppBar, Typography, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    padding: theme.spacing(2),
  },

  boardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Typography variant="h3" component="h1" className={classes.title}>
          Gomoku
        </Typography>
      </AppBar>

      <Container
        component="main"
        maxWidth="md"
        className={classes.boardContainer}
      >
        <>{children}</>
      </Container>
    </>
  );
};

export default Layout;
