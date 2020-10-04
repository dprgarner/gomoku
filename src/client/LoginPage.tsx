import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as firebase from 'firebase/app';

import { useFirebaseUser, useUpdateProfile } from './context/firebaseUser';
import useRedirectQueryParam from './context/useRedirectQueryParam';
import {
  AnonymousLoginButton,
  EmailLoginButton,
  GoogleLoginButton,
  LoginButtonsContainer,
  GoogleProfile,
} from './login';
import EmailLoginModal from './EmailLoginModal';
import MiscError from './components/MiscError';

const useRedirectLoggedInUser = () => {
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
};

const LoginPage = () => {
  const redirect = useRedirectQueryParam();
  const [isEmailModalOpen, setIsEmailModalOpen] = React.useState(false);
  const updateProfile = useUpdateProfile();
  useRedirectLoggedInUser();

  const [error, setError] = React.useState('');

  const handleGoogleLogin = async () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    const { additionalUserInfo } = await firebase
      .auth()
      .signInWithPopup(googleAuthProvider);

    const profile: GoogleProfile = additionalUserInfo?.profile || {};
    updateProfile({
      displayName: profile.given_name,
      photoURL: profile.picture,
    });
    redirect();
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
