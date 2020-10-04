import * as React from 'react';

import SerializedUserContext from './SerializedUserContext';

const useFirebaseUser = () => React.useContext(SerializedUserContext);

export default useFirebaseUser;
