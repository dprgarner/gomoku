import * as React from 'react';
import * as firebase from 'firebase/app';

import SetLoadingBackdrop from './loading/SetLoadingBackdrop';

type SerializedUser = Pick<
  firebase.User,
  'isAnonymous' | 'displayName' | 'photoURL'
>;

const SerializedUserContext = React.createContext<SerializedUser | null>(null);
const UserUpdaterContext = React.createContext<(user: SerializedUser) => void>(
  null as never,
);

export const FirebaseUserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<SerializedUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((newUser: firebase.User | null) => {
      setUser(newUser ? (newUser.toJSON() as SerializedUser) : null);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <SetLoadingBackdrop />;

  return (
    <SerializedUserContext.Provider value={user}>
      <UserUpdaterContext.Provider value={setUser}>
        {children}
      </UserUpdaterContext.Provider>
    </SerializedUserContext.Provider>
  );
};

export const useFirebaseUser = () => React.useContext(SerializedUserContext);

type Profile = {
  displayName?: string | null;
  photoURL?: string | null;
};

export const useUpdateProfile = () => {
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
