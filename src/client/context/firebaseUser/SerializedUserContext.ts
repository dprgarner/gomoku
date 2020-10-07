import * as React from 'react';
import * as firebase from 'firebase/app';

export type SerializedUser = Pick<
  firebase.User,
  'uid' | 'isAnonymous' | 'displayName' | 'photoURL'
>;

const SerializedUserContext = React.createContext<SerializedUser | null>(null);

export default SerializedUserContext;
