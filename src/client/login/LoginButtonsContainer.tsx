import * as React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';

import FadeIn from '~/client/components/FadeIn';
import CookiesModalLauncher from './CookiesModalLauncher';

type Props = {
  title: string;
  children: React.ReactNode;
};

const useStyles = makeStyles((theme) => ({
  welcomePage: {
    marginTop: theme.spacing(4),
    marginRight: 'auto',
    marginBottom: theme.spacing(4),
    marginLeft: 'auto',
    width: 450,
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    textAlign: 'center',
    margin: theme.spacing(4),
    padding: theme.spacing(6),
  },
}));

const LoginButtonsContainer = ({ title, children }: Props) => {
  const classes = useStyles();

  return (
    <FadeIn>
      <div className={classes.welcomePage}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4" component="h2" gutterBottom>
            {title}
          </Typography>

          {children}

          <CookiesModalLauncher />
        </Paper>
      </div>
    </FadeIn>
  );
};

export default LoginButtonsContainer;
