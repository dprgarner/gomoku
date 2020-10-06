import * as React from 'react';
import * as firebase from 'firebase/app';

import SetLoadingBackdrop from '../loading/SetLoadingBackdrop';
import SerializedUserContext, { SerializedUser } from './SerializedUserContext';
import UserUpdaterContext from './UserUpdaterContext';
import CredentialsContext from './CredentialsContext';

const FirebaseUserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<SerializedUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const [credentials, setCredentials] = React.useState<string | null>(null);

  React.useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((newUser: firebase.User | null) => {
        setUser(newUser ? (newUser.toJSON() as SerializedUser) : null);
        setIsLoading(false);

        if (newUser) {
          newUser.getIdToken().then(setCredentials);
        }
      });

    return () => unsubscribe();
  }, []);

  if (isLoading) return <SetLoadingBackdrop />;

  return (
    <SerializedUserContext.Provider value={user}>
      <UserUpdaterContext.Provider value={setUser}>
        <CredentialsContext.Provider value={credentials}>
          {children}
        </CredentialsContext.Provider>
      </UserUpdaterContext.Provider>
    </SerializedUserContext.Provider>
  );
};

export default FirebaseUserProvider;
