import * as React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import EmailIcon from '@material-ui/icons/Email';

import BaseLoginButton, { BaseLoginButtonProps } from './BaseLoginButton';
import Google from './Google.svg';

type LoginButtonProps = Omit<BaseLoginButtonProps, 'color' | 'icon' | 'text'>;

export const EmailLoginButton = (props: LoginButtonProps) => (
  <BaseLoginButton
    color="primary"
    icon={<EmailIcon fontSize="large" />}
    text="Sign in with email"
    {...props}
  />
);

export const GoogleLoginButton = (props: LoginButtonProps) => (
  <BaseLoginButton
    color="white"
    icon={<Google />}
    text="Sign in with Google"
    {...props}
  />
);
export const AnonymousLoginButton = (props: LoginButtonProps) => (
  <BaseLoginButton
    color="secondary"
    icon={<PersonOutlineIcon fontSize="large" />}
    text="Play anonymously"
    {...props}
  />
);
