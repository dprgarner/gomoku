import * as React from 'react';
import * as firebase from 'firebase/app';

import SetLoadingBackdrop from '../loading/SetLoadingBackdrop';
import ProfileContext, { Profile } from './ProfileContext';
import UpdateProfileContext from './UpdateProfileContext';
import CredentialsContext from './CredentialsContext';

const FirebaseUserProvider: React.FC = ({ children }) => {
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [credentials, setCredentials] = React.useState<string | null>(null);

  React.useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((newProfile: firebase.User | null) => {
        setProfile(newProfile ? (newProfile.toJSON() as Profile) : null);
        setIsLoading(false);

        if (newProfile) {
          newProfile.getIdToken().then(setCredentials);
        }
      });

    return () => unsubscribe();
  }, []);

  if (isLoading) return <SetLoadingBackdrop />;

  return (
    <ProfileContext.Provider value={profile}>
      <UpdateProfileContext.Provider value={setProfile}>
        <CredentialsContext.Provider value={credentials}>
          {children}
        </CredentialsContext.Provider>
      </UpdateProfileContext.Provider>
    </ProfileContext.Provider>
  );
};

export default FirebaseUserProvider;
