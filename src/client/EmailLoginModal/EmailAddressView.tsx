import * as React from 'react';
import * as firebase from 'firebase/app';

import { Field, NavButtons, Title, Form } from './components';

type Props = {
  email: string;
  onBack: () => void;
  onChangeEmail: (email: string) => void;
  onNext: (view: 'EXISTS' | 'CREATE') => void;
  onError: () => void;
};

const EmailAddressView = ({
  email,
  onBack,
  onChangeEmail,
  onError,
  onNext,
}: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');

  const handleNext = async () => {
    try {
      setIsLoading(true);
      setEmailError('');

      const methods = await firebase.auth().fetchSignInMethodsForEmail(email);

      if (methods.includes('password')) {
        onNext('EXISTS');
      } else if (!methods.includes('google.com')) {
        onNext('CREATE');
      } else {
        setIsLoading(false);
        setEmailError(
          'Cannot register a new password for a Google email. Log in via Google instead.',
        );
      }
    } catch (e) {
      setIsLoading(false);
      if (e?.code === 'auth/invalid-email') {
        setEmailError(e.message);
      } else {
        onError();
      }
    }
  };

  return (
    <Form onSubmit={handleNext}>
      <Title>Enter your email address</Title>

      <Field
        autoComplete="email"
        error={emailError}
        focusOnMount
        label="Email"
        onChange={onChangeEmail}
        type="text"
        value={email}
      />

      <NavButtons
        backText="Cancel"
        nextText="Next"
        isLoading={isLoading}
        onBack={onBack}
      />
    </Form>
  );
};

export default EmailAddressView;
