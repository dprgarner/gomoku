import * as React from 'react';
import { CredentialsContext } from './contexts';

const useCredentials = () => React.useContext(CredentialsContext);

export default useCredentials;
