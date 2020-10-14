import * as React from 'react';

import { ProfileContext } from './contexts';

const useProfile = () => React.useContext(ProfileContext);

export default useProfile;
