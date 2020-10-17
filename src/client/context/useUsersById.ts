import useUsers from './useUsers';

type User = {
  uid?: string;
  displayName?: string;
  photoURL?: string;
};

type UsersById = {
  [uid: string]: User;
};

const useUsersById = (uids: (string | undefined)[] | null) => {
  const { users } = useUsers(uids || []);

  if (!uids) return null;

  return users.reduce<UsersById>((acc, user) => {
    const { uid } = user;
    if (!uid) return acc;
    return { ...acc, [uid]: { ...user, uid } };
  }, {});
};

export default useUsersById;
