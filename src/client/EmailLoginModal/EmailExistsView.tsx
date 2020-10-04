import * as React from 'react';
import * as firebase from 'firebase/app';

import { Field, NavButtons, Title, Form } from './components';

type Props = {
  email: string;
  onBack: () => void;
  onChangeEmail: (email: string) => void;
  onError: () => void;
  onNext: () => void;
};

const EmailExistsView = ({
  email,
  onBack,
  onChangeEmail,
  onNext,
  onError,
}: Props) => {
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleNext = async () => {
    try {
      setIsLoading(true);
      setEmailError('');
      setPasswordError('');
      await firebase.auth().signInWithEmailAndPassword(email, password);

      onNext();
    } catch (e) {
      setIsLoading(false);
      if (
        e?.code === 'auth/invalid-email' ||
        e?.code === 'auth/user-not-found'
      ) {
        setEmailError(e.message);
      } else if (e?.code === 'auth/wrong-password') {
        setPasswordError(e.message);
      } else {
        onError();
      }
    }
  };

  return (
    <Form onSubmit={handleNext}>
      <Title>Enter your email address and password</Title>

      <Field
        autoComplete="email"
        error={emailError}
        label="Email"
        onChange={onChangeEmail}
        type="text"
        value={email}
      />

      <Field
        autoComplete="password"
        error={passwordError}
        focusOnMount
        label="Password"
        onChange={setPassword}
        type="password"
        value={password}
      />

      <NavButtons
        backText="Go back"
        nextText="Log in"
        isLoading={isLoading}
        onBack={onBack}
      />
    </Form>
  );
};

export default EmailExistsView;
