import * as React from 'react';

import { useProfile } from '../context/firebaseUser';
import LoggedInUserMenu from './LoggedInUserMenu';

const UserMenu = () => {
  const user = useProfile();
  return user && <LoggedInUserMenu {...user} />;
};

export default UserMenu;
