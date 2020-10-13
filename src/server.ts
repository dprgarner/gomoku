import path from 'path';
import { Server } from 'boardgame.io/server';
import serve from 'koa-static';
import { PostgresStore } from 'bgio-postgres';
import * as admin from 'firebase-admin';

import game from './shared/game';
import usersEndpoint from './usersEndpoint';
import { Middleware } from 'koa';

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.ADMIN_CREDENTIALS)),
});

const distClient = path.resolve(__dirname, '..', 'dist_client');
const serveStaticFiles = process.env.NODE_ENV === 'production';
const port = parseInt(process.env.PORT, 10);

const db = new PostgresStore(process.env.DATABASE_URL, {
  logging: false,
});

const server = Server({
  games: [game],

  db,

  generateCredentials: async (ctx) => {
    try {
      const authHeader: string = ctx.get('authorization') || '';
      const [, token] = authHeader.match(/Bearer (.*)/i) || [];
      if (!token) {
        throw new Error('Could not read token from Authorization header');
      }
      const { uid } = await admin.auth().verifyIdToken(token);

      // This is a bit leaky, but the player metadata _must_ contain the
      // current user's ID.
      if (ctx.request.body?.data?.uid !== uid) {
        throw new Error('Invalid player metadata');
      }

      return uid;
    } catch (e) {
      console.error(e);
      ctx.status = 401;
      throw e;
    }
  },

  authenticateCredentials: async (credentials, playerMetadata) => {
    try {
      const { uid } = await admin.auth().verifyIdToken(credentials);
      if (uid !== playerMetadata.credentials) {
        throw new Error('User token is not valid for this user');
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});

if (serveStaticFiles) {
  server.app.use(serve(distClient));
}

const allowCors: Middleware = async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', '*');
  return next();
};

if (process.env.NODE_ENV !== 'production') {
  server.app.use(allowCors);
}

server.app.use(usersEndpoint);

server.run(port, () => {
  if (serveStaticFiles) {
    // Taken from the documentation. Serves /index.html to any unmatched path.
    server.app.use(
      async (ctx, next) =>
        await serve(distClient)(
          Object.assign(ctx, { path: 'index.html' }),
          next,
        ),
    );
  }
});
