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

- APP_URL
- All of Firebase config...

## TODO

### With Firebase Auth

- I forgot my password
- I want to change my password
- I want to upgrade from anon to email-logged-in user
- What does /login do if already logged in?
  - Log-in page hides options that are already available?
  - Or redirect to a new page?

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

### UI

- More emphasis on last-played stone. Animation when being played, like a slight zoom? Or perhaps an outline?
- Highlight winning five-in-a-row
- Who am I? (Top corner? Drop-down?)

### Options for game

- Board size (15x15 or 19x19?)
- listed
- black or white
- (Fixed params: numPlayers=2, in-a-row=5)
- No overshooting (6-in-a-row does not win)
- Nerf Black (cannot move next to first stone)
