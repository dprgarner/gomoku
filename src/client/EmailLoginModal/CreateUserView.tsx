import * as React from 'react';
import * as firebase from 'firebase/app';

import { useUpdateProfile } from '~/client/context/firebaseUser';
import { Field, NavButtons, Title, Form } from './components';

type Props = {
  email: string;
  onBack: () => void;
  onChangeEmail: (email: string) => void;
  onError: (error: Error) => void;
  onNext: () => void;
};

const CreateUserView = ({
  email,
  onChangeEmail,
  onBack,
  onError,
  onNext,
}: Props) => {
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const updateProfile = useUpdateProfile();
  if (!updateProfile) return null;

  const handleNext = async () => {
    try {
      setIsLoading(true);
      setEmailError('');
      setPasswordError('');

      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (!user) {
        onError(new Error('User could not be created'));
        return;
      }
      if (name) {
        await updateProfile({ displayName: name });
      }
      onNext();
    } catch (e) {
      setIsLoading(false);
      if (
        e?.code === 'auth/invalid-email' ||
        e?.code === 'auth/email-already-in-use'
      ) {
        setEmailError(e.message);
      } else if (e?.code === 'auth/weak-password') {
        setPasswordError(e.message);
      } else {
        onError(e);
      }
    }
  };

  return (
    <Form onSubmit={handleNext}>
      <Title>{'Choose an email address and password'}</Title>

      <Field
        autoComplete="email"
        error={emailError}
        focusOnMount
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

      <Field
        autoComplete="nickname"
        label="Display Name"
        onChange={setName}
        type="text"
        value={name}
      />

      <NavButtons
        backText="Go back"
        nextText="Create Account"
        isLoading={isLoading}
        onBack={onBack}
      />
    </Form>
  );
};

export default CreateUserView;
