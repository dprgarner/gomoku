import * as React from 'react';
import CredentialsContext from './CredentialsContext';

const useCredentials = () => React.useContext(CredentialsContext);

export default useCredentials;
