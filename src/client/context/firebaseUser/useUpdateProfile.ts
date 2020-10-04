import * as React from 'react';
import * as firebase from 'firebase/app';

import { SerializedUser } from './SerializedUserContext';
import UserUpdaterContext from './UserUpdaterContext';

type Profile = {
  displayName?: string | null;
  photoURL?: string | null;
};

const useUpdateProfile = () => {
  const setUser = React.useContext(UserUpdaterContext);

  const updateProfile = async (profile: Profile) => {
    const user = firebase.auth().currentUser;
    if (user) {
      setUser({ ...(user.toJSON() as SerializedUser), ...profile });
      await user.updateProfile(profile);
    }
  };

  return updateProfile;
};

export default useUpdateProfile;
