import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from 'firebase/app';

import { useProfile, useUpdateGoogleProfile } from './context/firebaseUser';
import useRedirectQueryParam from './context/useRedirectQueryParam';
import {
  AnonymousLoginButton,
  EmailLoginButton,
  GoogleLoginButton,
  LoginButtonsContainer,
} from './login';
import EmailLoginModal from './EmailLoginModal';
import MiscError from './components/MiscError';

const useRedirectLoggedInUser = () => {
  const history = useHistory();
  const location = useLocation();
  const user = useProfile();

  React.useEffect(() => {
    if (user) {
      history.push({
        ...location,
        pathname: '/add-login-method',
      });
    }
  }, [user, location, history]);
};

const LoginPage = () => {
  const redirect = useRedirectQueryParam();
  const [isEmailModalOpen, setIsEmailModalOpen] = React.useState(false);
  const updateGoogleProfile = useUpdateGoogleProfile();
  useRedirectLoggedInUser();

  const [error, setError] = React.useState('');

  const handleGoogleLogin = async () => {
    try {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      const { additionalUserInfo } = await firebase
        .auth()
        .signInWithPopup(googleAuthProvider);
      updateGoogleProfile(additionalUserInfo);
      redirect();
    } catch (e) {
      console.error(e);
      setError(e.message || 'Something went wrong.');
    }
  };

  return (
    <LoginButtonsContainer title="Welcome, friend">
      <EmailLoginButton noDelay onClick={() => setIsEmailModalOpen(true)} />
      <EmailLoginModal
        isOpen={isEmailModalOpen}
        onError={(e) => {
          setIsEmailModalOpen(false);
          console.error(e);
          setError(e?.message || 'Something went wrong.');
        }}
        onClose={() => setIsEmailModalOpen(false)}
        onLoginComplete={redirect}
      />

      <GoogleLoginButton onClick={handleGoogleLogin} />

      <AnonymousLoginButton
        onClick={async () => {
          await firebase.auth().signInAnonymously();
          redirect();
        }}
      />

      {error && <MiscError error={error} onClose={() => setError('')} />}
    </LoginButtonsContainer>
  );
};

export default LoginPage;
