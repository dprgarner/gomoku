import * as React from 'react';

import { SerializedUsers } from '~/shared/types';
import { serverRoot } from '../config';

export enum Status {
  Ok,
  Error,
  Loading,
}

type User = {
  uid?: string;
  displayName?: string;
  photoURL?: string;
};

const isNotUndefined = <T extends unknown>(x: T | undefined): x is T =>
  x !== undefined;

const useUsers = (uids: (string | undefined)[]) => {
  const [usersData, setUsersData] = React.useState<SerializedUsers>({});
  const [status, setStatus] = React.useState<Status>(Status.Loading);

  const apiPath =
    uids.length &&
    `${serverRoot}/users?${uids
      .filter(isNotUndefined)
      .map((uid) => `uid=${uid}`)
      .join('&')}`;

  React.useEffect(() => {
    (async () => {
      if (!apiPath) return;
      try {
        setStatus(Status.Loading);
        const userResponse = await window.fetch(apiPath);
        setUsersData(await userResponse.json());
        setStatus(Status.Ok);
      } catch (e) {
        setStatus(Status.Error);
        console.error(e);
      }
    })();
  }, [apiPath]);

  const users: User[] = uids.map((uid) => (uid && usersData[uid]) || {});
  return { users, status };
};

export default useUsers;
