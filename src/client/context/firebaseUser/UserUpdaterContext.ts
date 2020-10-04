import * as React from 'react';

import { SerializedUser } from './SerializedUserContext';

const UserUpdaterContext = React.createContext<(user: SerializedUser) => void>(
  null as never,
);

export default UserUpdaterContext;
