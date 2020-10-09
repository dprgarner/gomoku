import * as React from 'react';

import { Profile } from './ProfileContext';

const UpdateProfileContext = React.createContext<(profile: Profile) => void>(
  // The default value should never be used. Consuming components of this
  // context should not be rendered outside of the provider's tree.
  null as never,
);

export default UpdateProfileContext;
