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

const EmailAddressView = ({ state, dispatch, onCancel }: Props) => (
  <>
    <Title>Enter your email address</Title>

    <Field
      autoComplete="email"
      error={state.errors.email}
      focusOnMount
      label="Email"
      onChange={(email) => dispatch({ type: 'SET_EMAIL', email })}
      type="text"
      value={state.email}
    />

    <NavButtons
      nextText="Next"
      isLoading={!!state.emailToCheck}
      onCancel={onCancel}
      onNext={() => dispatch({ type: 'CHECK_EMAIL', email: state.email })}
    />
  </>
);

export default EmailAddressView;
