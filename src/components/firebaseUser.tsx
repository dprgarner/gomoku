import * as React from 'react';
import * as firebase from 'firebase/app';

import SetLoadingBackdrop from './loading/SetLoadingBackdrop';

const FirebaseUserContext = React.createContext<firebase.User | null>(null);

export const FirebaseUserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <SetLoadingBackdrop />;

  return (
    <FirebaseUserContext.Provider value={user}>
      {children}
    </FirebaseUserContext.Provider>
  );
};

export const useFirebaseUser = () => React.useContext(FirebaseUserContext);
