import * as React from 'react';
import {
  Backdrop,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from 'firebase/app';

import FadeIn from '../FadeIn';

import {
  AnonymousLoginButton,
  EmailLoginButton,
  GoogleLoginButton,
} from './loginButtons';
import EmailModalBody from './EmailModalBody';

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

type EmailLoginModalLauncherProps = {
  onLoginComplete: () => void;
};
const EmailLoginModalLauncher = ({
  onLoginComplete,
}: EmailLoginModalLauncherProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <EmailLoginButton noDelay onClick={() => setIsOpen(true)} />
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 350 }}
      >
        <>
          <EmailModalBody onLoginComplete={onLoginComplete} />
        </>
      </Modal>
    </>
  );
};

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const useRedirectDestination = () => {
  const { search } = useLocation();
  const [, redirectParam] = search.match(/\?redirect=([^\&]*)/) || [];
  const redirectDestination = decodeURIComponent(redirectParam || '') || '/';
  return redirectDestination;
};

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const redirectDestination = useRedirectDestination();

  const redirect = () => {
    history.push(redirectDestination);
  };

  return (
    <FadeIn>
      <div className={classes.welcomePage}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4" component="h2" gutterBottom>
            {'Welcome, friend'}
          </Typography>

          <EmailLoginModalLauncher
            onLoginComplete={() => {
              redirect();
            }}
          />

          <GoogleLoginButton
            onClick={async () => {
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
