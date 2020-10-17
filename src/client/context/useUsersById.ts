import useUsers, { Status } from './useUsers';

type User = {
  uid: string;
  displayName?: string;
  photoURL?: string;
};

type UsersById = {
  [uid: string]: User;
};

const useUsersById = (uids: (string | undefined)[] | null) => {
  const { users, status } = useUsers(uids || []);

  if (!uids || status === Status.Loading) return null;

  const anonymousUsersById = uids.reduce<UsersById>((acc, uid) => {
    if (!uid) return acc;
    return { ...acc, [uid]: { uid } };
  }, {});

  return users.reduce<UsersById>((acc, user, idx) => {
    const uid = uids[idx];
    if (!uid) return acc;
    return { ...acc, [uid]: { ...acc[uid], ...user } };
  }, anonymousUsersById);
};

export default useUsersById;
