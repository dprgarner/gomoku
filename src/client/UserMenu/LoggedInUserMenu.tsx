import * as React from 'react';
import { MenuItem } from '@material-ui/core';
import * as firebase from 'firebase/app';
import { useHistory } from 'react-router';

import useEncodedLocation from '../context/useEncodedLocation';
import AvatarPopup from './AvatarPopup';

type Props = {
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
};

const LoggedInUserMenu = ({ isAnonymous, displayName, photoURL }: Props) => {
  const history = useHistory();
  const redirectPath = useEncodedLocation();

  return (
    <AvatarPopup
      displayName={displayName || undefined}
      photoURL={photoURL || undefined}
      text={`Welcome, ${displayName || 'stranger'}`}
    >
      {(closeMenu) => (
        <>
          {isAnonymous ? (
            <MenuItem
              onClick={() => {
                closeMenu();
                history.push(`/add-login-method?redirect=${redirectPath}`);
              }}
            >
              Log in
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                closeMenu();
                firebase.auth().signOut();
              }}
            >
              Log out
            </MenuItem>
          )}
        </>
      )}
    </AvatarPopup>
  );
};

export default LoggedInUserMenu;
