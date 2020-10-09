import * as React from 'react';
import * as firebase from 'firebase/app';

import { Profile } from './ProfileContext';
import UpdateProfileContext from './UpdateProfileContext';

const useUpdateProfile = () => {
  const setProfile = React.useContext(UpdateProfileContext);

  const updateProfile = async (updateProfileFields: Partial<Profile>) => {
    const profile = firebase.auth().currentUser;
    if (profile) {
      setProfile({
        ...profile,
        ...updateProfileFields,
      });
      await profile.updateProfile(updateProfileFields);
    }
  };

  return updateProfile;
};

export default useUpdateProfile;
