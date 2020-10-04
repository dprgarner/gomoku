import * as React from 'react';
import * as firebase from 'firebase/app';

import SetLoadingBackdrop from '../loading/SetLoadingBackdrop';
import SerializedUserContext, { SerializedUser } from './SerializedUserContext';
import UserUpdaterContext from './UserUpdaterContext';

const FirebaseUserProvider: React.FC = ({ children }) => {
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

export default FirebaseUserProvider;
