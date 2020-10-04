import * as React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';

import FadeIn from '~/components/FadeIn';

type Props = {
  title: string;
  children: React.ReactNode;
};

const useStyles = makeStyles((theme) => ({
  welcomePage: {
    margin: theme.spacing(4),
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
        </Paper>
      </div>
    </FadeIn>
  );
};

export default LoginButtonsContainer;
