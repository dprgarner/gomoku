# Gomoku

This is an unabashedy isomorphic app, with co-located client and server code.

## Developing

```
> docker-compose up
```

In development mode, the client starts on port 1234, the server starts on port 8000, and the database starts on port 5432.

## Production

When running in production mode, the static files are served by the same Koa server as the Board game server. For debugging this server locally:

```
> docker-compose -f docker-compose.prod.yml up
```

## Required .env variables

Several env variables need to be provided for local development or when running in production. This includes credentials for a Firebase service account and credentials for a Firebase client.

See `process.env` in [types.d.ts](types.d.ts) for the list of required variables. Any variable not provided in the docker-compose files should be included in a `.env` file.
