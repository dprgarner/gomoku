import * as React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import EmailIcon from '@material-ui/icons/Email';

import BaseLoginButton from './BaseLoginButton';
import Google from './Google.svg';

type LoginButtonProps = {
  onClick: () => void;
};

export const EmailLoginButton = ({ onClick }: LoginButtonProps) => (
  <BaseLoginButton
    color="primary"
    icon={<EmailIcon fontSize="large" />}
    text="Sign in with email"
    onClick={onClick}
  />
);

export const GoogleLoginButton = ({ onClick }: LoginButtonProps) => (
  <BaseLoginButton
    color="white"
    icon={<Google />}
    text="Sign in with Google"
    onClick={onClick}
  />
);

export const AnonymousLoginButton = ({ onClick }: LoginButtonProps) => (
  <BaseLoginButton
    color="secondary"
    icon={<PersonOutlineIcon fontSize="large" />}
    text="Play anonymously"
    onClick={onClick}
  />
);
