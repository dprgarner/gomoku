import path from 'path';
import { Server } from 'boardgame.io/server';
import serve from 'koa-static';
import { PostgresStore } from 'bgio-postgres';
import * as admin from 'firebase-admin';

import game from './shared/game';
import usersEndpoint from './usersEndpoint';

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
});

if (serveStaticFiles) {
  server.app.use(serve(distClient));
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
