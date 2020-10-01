import * as React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import FadeIn from '../FadeIn';
import {
  AnonymousLoginButton,
  EmailLoginButton,
  GoogleLoginButton,
} from './loginButtons';

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

const WelcomePage = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <FadeIn>
      <div className={classes.welcomePage}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4" component="h2" gutterBottom>
            {'Welcome, friend'}
          </Typography>

          <EmailLoginButton
            onClick={() => {
              history.push('/fake-login');
            }}
          />

          <GoogleLoginButton
            onClick={() => {
              alert('beep');
            }}
          />

          <AnonymousLoginButton
            onClick={() => {
              history.push('/fake-lobby');
            }}
          />
        </Paper>
      </div>
    </FadeIn>
  );
};

export default WelcomePage;
