import * as firebase from 'firebase/app';

import useUpdateProfile from './useUpdateProfile';

type GoogleProfile = {
  picture?: string;
  given_name?: string;
};

const useUpdateGoogleProfile = () => {
  const updateProfile = useUpdateProfile();

  const updateGoogleProfile = (
    additionalUserInfo?: firebase.auth.AdditionalUserInfo | null,
  ) => {
    if (additionalUserInfo) {
      const profile: GoogleProfile = additionalUserInfo.profile || {};
      updateProfile({
        displayName: profile.given_name,
        photoURL: profile.picture,
      });
    }
  };

  return updateGoogleProfile;
};

export default useUpdateGoogleProfile;
