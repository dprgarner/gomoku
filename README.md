# Gomoku

This is an unabashedy isomorphic app, with co-located client and server code.

## Developing

```
> docker-compose up
```

In development mode, the client starts on port 1234, the hot-reloading websocket runs on port 4321, the server starts on port 8000, and the database starts on port 5432.

## Production

When running in production mode, the static files are served by the same Koa server as the Board game server. For debugging this server locally:

```
> docker-compose -f docker-compose.prod.yml up
```

## Required .env variables

Several env variables need to be provided for local development or when running in production. See `process.env` in [types.d.ts](types.d.ts) for the list of required variables. Any variable not provided in the docker-compose files should be included in a `.env` file.

## TODO

- Sort out CORS.
- Lobby.
- Cache users. It looks a bit daft, being fetched each time.
- "Delete all data" button.
- GDPR?

### Lobby card

What goes on a game card?

- Is it in progress? (Not known)
- One or two players?
- Names of players?
- Moves played?
- "Join" button?
- "Watch" button?
- Listed? (We know this)
- Board size? (Who cares?)
- Free space?

### With Firebase Auth

- I forgot my password
- I want to change my password
- I want to upgrade from anon to email-logged-in user
- I want to delete everything about myself on the app
- I want to change my display name

### UI

- I logged in and my initial is "W". W for WTF?
- More emphasis on last-played stone. Animation when being played, like a slight zoom? Or perhaps an outline?
- Highlight winning five-in-a-row

### Bug (Probably)

- If I leave my browser open for an hour and then play a move, the token will be invalid. The backend doesn't handle invalid credentials very well, so there's no way to recover from this.

### Bug

- If I leave my browser open for an hour and then play a move, the token will be invalid. The backend doesn't return credential-errors to the frontend.

### Options for game

- Board size (15x15 or 19x19?)
- listed
- black or white
- (Fixed params: numPlayers=2, in-a-row=5)
- No overshooting (6-in-a-row does not win)
- Nerf Black (cannot move next to first stone)
