import * as React from 'react';
import * as firebase from 'firebase/app';

export type Profile = Pick<
  firebase.User,
  'uid' | 'isAnonymous' | 'displayName' | 'photoURL'
>;

export type UpdateProfile = (profile: Partial<Profile>) => Promise<void>;

export const CredentialsContext = React.createContext<string | null>(null);

export const ProfileContext = React.createContext<Profile | null>(null);

export const UpdateProfileContext = React.createContext<UpdateProfile | null>(
  null,
);
