import * as React from 'react';

import { EmailFormState, EmailFormDispatch } from './useEmailFormReducer';
import Field from './Field';
import NavButtons from './NavButtons';
import Title from './Title';

type Props = {
  state: EmailFormState;
  dispatch: EmailFormDispatch;
  onCancel: () => void;
};

const EmailExistsView = ({ state, dispatch, onCancel }: Props) => (
  <>
    <Title>Enter your email address and password</Title>

    <Field
      autoComplete="email"
      error={state.errors.email}
      focusOnMount
      label="Email"
      onChange={(email) => dispatch({ type: 'SET_EMAIL', email })}
      type="text"
      value={state.email}
    />

    <Field
      autoComplete="password"
      error={state.errors.password}
      focusOnMount
      label="Password"
      onChange={(password) => dispatch({ type: 'SET_PASSWORD', password })}
      type="password"
      value={state.password}
    />

    <NavButtons
      nextText="Log in"
      isLoading={!!state.signInDetails}
      onCancel={onCancel}
      onNext={() =>
        dispatch({
          type: 'SIGN_IN',
          email: state.email,
          password: state.password,
        })
      }
    />
  </>
);

export default EmailExistsView;
