import * as React from 'react';
import * as firebase from 'firebase/app';
import { useHistory } from 'react-router';

import useEncodedLocation from '../context/useEncodedLocation';
import AvatarPopupMenu from './AvatarPopupMenu';

type Props = {
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
};

const LoggedInUserMenu = ({ isAnonymous, displayName, photoURL }: Props) => {
  const history = useHistory();
  const redirectPath = useEncodedLocation();

  const anonymousMenuItems = [
    {
      text: 'Log in',
      onClick: () => {
        history.push(`/add-login-method?redirect=${redirectPath}`);
      },
    },
  ];
  const loggedInMenuItems = [
    {
      text: 'Log out',
      onClick: () => {
        firebase.auth().signOut();
      },
    },
    {
      text: 'View Profile',
      onClick: () => {
        history.push(`/profile`);
      },
    },
  ];

  return (
    <AvatarPopupMenu
      displayName={displayName || undefined}
      photoURL={photoURL || undefined}
      avatarText={`Welcome, ${displayName || 'stranger'}`}
      menuItems={isAnonymous ? anonymousMenuItems : loggedInMenuItems}
    />
  );
};

export default LoggedInUserMenu;
