import { Middleware } from 'koa';
import * as admin from 'firebase-admin';
import { SerializedUsers } from './shared/types';

const getUids = (uid: string | string[] | undefined) => {
  if (!uid) return [];
  if (typeof uid === 'string') return [uid];
  return uid;
};

const getSerializedUsers = async (uids: string[]) => {
  const userQuery = uids.map((uid) => ({ uid }));
  const { users } = await admin.auth().getUsers(userQuery);

  const serializedUsers = users.reduce<SerializedUsers>(
    (acc, { uid, displayName, photoURL }) => ({
      ...acc,
      [uid]: { displayName, photoURL },
    }),
    {},
  );

  return serializedUsers;
};

const usersEndpoint: Middleware = async (ctx, next) => {
  if (ctx.request.path !== '/users' || ctx.request.method !== 'GET') {
    return next();
  }

  const uids = getUids(ctx.request.query.uid);
  ctx.response.body = await getSerializedUsers(uids);
  ctx.response.status = 200;
};

export default usersEndpoint;
