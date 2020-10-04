import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from 'firebase/app';

import {
  AnonymousLoginButton,
  EmailLoginButton,
  GoogleLoginButton,
} from './login/buttons';
import EmailLoginModal from './EmailLoginModal';
import { useFirebaseUser } from './firebaseUser';
import LoginButtonsContainer from './login/LoginButtonsContainer';

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
    <LoginButtonsContainer title="Welcome, friend">
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
    </LoginButtonsContainer>
  );
};

export default LoginPage;
