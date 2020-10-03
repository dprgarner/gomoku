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

const CreateUserView = ({ state, dispatch, onCancel }: Props) => (
  <>
    <Title>{'Choose an email address and password'}</Title>

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

    <Field
      autoComplete="name"
      label="Display Name"
      onChange={(name) => dispatch({ type: 'SET_NAME', name })}
      type="text"
      value={state.name}
    />

    <NavButtons
      nextText="Create Account"
      isLoading={!!state.createAccountDetails}
      onCancel={onCancel}
      onNext={() =>
        dispatch({
          type: 'CREATE_ACCOUNT',
          email: state.email,
          password: state.password,
          name: state.name,
        })
      }
    />
  </>
);

export default CreateUserView;
