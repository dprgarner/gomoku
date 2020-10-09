import * as React from 'react';
import * as firebase from 'firebase/app';

export type Profile = Pick<
  firebase.User,
  'uid' | 'isAnonymous' | 'displayName' | 'photoURL'
>;

const ProfileContext = React.createContext<Profile | null>(null);

export default ProfileContext;
