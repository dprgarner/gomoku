import * as React from 'react';
import {
  Backdrop,
  Button,
  Fade,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import firebase from '../firebase';
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

const EmailLoginButtonWithModal = ({ onLogin }: { onLogin: () => void }) => {
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
        <EmailModalBody />
      </Modal>
    </>
  );
};

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

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

          <EmailLoginButtonWithModal
            onLogin={() => {
              history.push('/fake-login');
            }}
          />

          <GoogleLoginButton
            onClick={async () => {
              await firebase.auth().signInWithPopup(googleAuthProvider);
              history.push('/');
            }}
          />

          <AnonymousLoginButton
            onClick={async () => {
              await firebase.auth().signInAnonymously();
              history.push('/');
            }}
          />
        </Paper>
      </div>
    </FadeIn>
  );
};

export default WelcomePage;
