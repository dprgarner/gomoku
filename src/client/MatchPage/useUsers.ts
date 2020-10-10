import * as React from 'react';

import { SerializedUsers } from '~/shared/types';
import { serverRoot } from '../config';

export enum Status {
  Ok,
  Error,
  Loading,
}

const useUsers = (uids: (string | undefined)[]) => {
  const [usersData, setUsersData] = React.useState<SerializedUsers>({});
  const [status, setStatus] = React.useState<Status>(Status.Loading);

  React.useEffect(() => {
    (async () => {
      try {
        setStatus(Status.Loading);
        const apiPath = `${serverRoot}/users?${uids
          .filter((uid) => uid)
          .map((uid) => `uid=${uid}`)
          .join('&')}`;
        const userResponse = await window.fetch(apiPath);
        setUsersData(await userResponse.json());
        setStatus(Status.Ok);
      } catch (e) {
        setStatus(Status.Error);
        console.error(e);
      }
    })();
  }, [uids]);

  const users = uids.map((uid) => (uid && usersData[uid]) || {});

  return { users, status };
};

export default useUsers;
