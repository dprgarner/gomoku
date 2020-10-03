import * as React from 'react';
import * as firebase from 'firebase/app';

import useEmailFormReducer from './useEmailFormReducer';
import EmailAddressView from './EmailAddressView';
import CreateUserView from './CreateUserView';
import EmailExistsView from './EmailExistsView';

type Props = {
  onCancel: () => void;
  onError: () => void;
  onLoginComplete: () => void;
};

const views = {
  EMAIL: EmailAddressView,
  CREATE: CreateUserView,
  EXISTS: EmailExistsView,
};

const EmailForm = ({ onCancel, onError, onLoginComplete }: Props) => {
  const [state, dispatch] = useEmailFormReducer();

  React.useEffect(() => {
    if (state.emailToCheck) {
      firebase
        .auth()
        .fetchSignInMethodsForEmail(state.emailToCheck)
        .then((methods) => {
          dispatch({ type: 'CHECK_EMAIL_COMPLETE', methods });
        })
        .catch((e) => {
          if (e && e.code === 'auth/invalid-email') {
            dispatch({ type: 'CHECK_EMAIL_ERROR', message: e.message });
          } else {
            onError();
          }
        });
    }
  }, [state.emailToCheck]);

  React.useEffect(() => {
    if (state.createAccountDetails) {
      const { email, password, name } = state.createAccountDetails;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) =>
          user && name ? user.updateProfile({ displayName: name }) : null,
        )
        .then(() => {
          onLoginComplete();
        })
        .catch((e) => {
          if (
            e?.code === 'auth/invalid-email' ||
            e?.code === 'auth/email-already-in-use'
          ) {
            dispatch({
              type: 'CREATE_ACCOUNT_EMAIL_ERROR',
              message: e.message,
            });
          } else if (e?.code === 'auth/weak-password') {
            dispatch({
              type: 'CREATE_ACCOUNT_PASSWORD_ERROR',
              message: e.message,
            });
          } else {
            onError();
          }
        });
    }
  }, [state.createAccountDetails]);

  React.useEffect(() => {
    if (state.signInDetails) {
      const { email, password } = state.signInDetails;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setTimeout(() => {
            onLoginComplete();
          }, 500);
        })
        .catch((e) => {
          if (
            e?.code === 'auth/invalid-email' ||
            e?.code === 'auth/user-not-found'
          ) {
            dispatch({
              type: 'SIGN_IN_EMAIL_ERROR',
              message: e.message,
            });
          } else if (e?.code === 'auth/wrong-password') {
            dispatch({
              type: 'SIGN_IN_PASSWORD_ERROR',
              message: e.message,
            });
          } else {
            onError();
          }
        });
    }
  }, [state.signInDetails]);

  const FormView = views[state.view];

  return <FormView state={state} dispatch={dispatch} onCancel={onCancel} />;
};

export default EmailForm;
