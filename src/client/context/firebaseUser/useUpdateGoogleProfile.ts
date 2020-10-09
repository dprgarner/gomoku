import * as firebase from 'firebase/app';

import useUpdateProfile from './useUpdateProfile';

type GoogleProfile = {
  given_name?: string;
  picture?: string;
};

const useUpdateGoogleProfile = () => {
  const updateProfile = useUpdateProfile();

  const updateGoogleProfile = (
    additionalUserInfo?: firebase.auth.AdditionalUserInfo | null,
  ) => {
    if (additionalUserInfo) {
      const googleProfile: GoogleProfile = additionalUserInfo.profile || {};
      updateProfile({
        displayName: googleProfile.given_name,
        photoURL: googleProfile.picture,
      });
    }
  };

  return updateGoogleProfile;
};

export default useUpdateGoogleProfile;
