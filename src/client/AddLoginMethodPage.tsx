import * as React from 'react';
import * as firebase from 'firebase/app';

import {
  AnonymousLoginButton,
  GoogleLoginButton,
  LoginButtonsContainer,
  GoogleProfile,
} from './login';
import useRedirectQueryParam from './context/useRedirectQueryParam';
import { useUpdateProfile } from './context/firebaseUser';
import MiscError from './components/MiscError';

const AddLoginMethodPage = () => {
  const redirect = useRedirectQueryParam();
  const updateProfile = useUpdateProfile();

  const [error, setError] = React.useState('');

  const currentUser = firebase.auth().currentUser;
  if (!currentUser) return null;

  const handleGoogleLogin = async () => {
    try {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      const { additionalUserInfo } = await currentUser.linkWithPopup(
        googleAuthProvider,
      );
      const profile: GoogleProfile = additionalUserInfo?.profile || {};
      updateProfile({
        displayName: profile.given_name,
        photoURL: profile.picture,
      });
      redirect();
    } catch (e) {
      console.error(e);
      setError(e?.message);
    }
  };

  return (
    <LoginButtonsContainer title="Choose a log-in method">
      <GoogleLoginButton onClick={handleGoogleLogin} />

      <AnonymousLoginButton onClick={redirect} />

      {error && <MiscError error={error} onClose={() => setError('')} />}
    </LoginButtonsContainer>
  );
};

export default AddLoginMethodPage;
