import * as React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from 'firebase/app';

import FadeIn from '~/components/FadeIn';

import {
  AnonymousLoginButton,
  EmailLoginButton,
  GoogleLoginButton,
} from './login/buttons';
import EmailLoginModal from './EmailLoginModal';
import { useFirebaseUser } from './firebaseUser';

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

const useRedirect = () => {
  const { search } = useLocation();
  const history = useHistory();
  const [, redirectParam] = search.match(/redirect=([^&]*)/) || [];
  const redirectDestination = decodeURIComponent(redirectParam || '') || '/';

  const redirect = () => {
    history.push(redirectDestination);
  };
  return redirect;
};

const LoginPage = () => {
  const classes = useStyles();
  const redirect = useRedirect();
  const [isEmailModalOpen, setIsEmailModalOpen] = React.useState(false);

  const history = useHistory();
  const location = useLocation();
  const user = useFirebaseUser();

  React.useEffect(() => {
    if (user) {
      history.push({
        ...location,
        pathname: '/add-login-method',
      });
    }
  }, [user, location, history]);

  return (
    <FadeIn>
      <div className={classes.welcomePage}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4" component="h2" gutterBottom>
            {'Welcome, friend'}
          </Typography>

          <EmailLoginButton noDelay onClick={() => setIsEmailModalOpen(true)} />
          <EmailLoginModal
            isOpen={isEmailModalOpen}
            onClose={() => setIsEmailModalOpen(false)}
            onLoginComplete={redirect}
          />

          <GoogleLoginButton
            onClick={async () => {
              const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
              await firebase.auth().signInWithPopup(googleAuthProvider);
              redirect();
            }}
          />

          <AnonymousLoginButton
            onClick={async () => {
              await firebase.auth().signInAnonymously();
              redirect();
            }}
          />
        </Paper>
      </div>
    </FadeIn>
  );
};

export default LoginPage;
