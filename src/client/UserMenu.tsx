import * as React from 'react';

import { useFirebaseUser } from './context/firebaseUser';
import LoggedInUserMenu from './LoggedInUserMenu';

const UserMenu = () => {
  const user = useFirebaseUser();
  return user && <LoggedInUserMenu {...user} />;
};

export default UserMenu;
