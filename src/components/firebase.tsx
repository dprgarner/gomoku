import * as React from 'react';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

import 'firebase/auth';
import 'firebaseui/dist/firebaseui.css';
import SetLoadingBackdrop from './loading/SetLoadingBackdrop';

// TODO can we avoid side-effects-on-import?
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
firebase.initializeApp(firebaseConfig);
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig: firebaseui.auth.Config = {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod:
        firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/',
};

export const useFirebaseUser = () => {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);

  return { user, isLoading };
};

export const Login = () => {
  React.useEffect(() => {
    ui.start('#fb', uiConfig);

    // TODO: why would .start need to be rendered conditionally?
    console.log('is pending:', ui.isPendingRedirect());
  }, []);

  return (
    <>
      {ui.isPendingRedirect() && <SetLoadingBackdrop />}
      <div id="fb" />
    </>
  );
};
