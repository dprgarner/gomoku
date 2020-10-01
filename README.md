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

- Finish Firebase stuff
- Fix docker rebuilding
- Log out
- Profile/delet this page
- Privacy Policy ☹️
- Lobby
- What's the winning five-in-a-row?
- Primary colour is a bit too intense. Perhaps keep banner as-is but make primary slightly dimmer?
- More emphasis on last-played stone. Animation when being played, like a slight zoom? Or perhaps an outline?

### Flow 1: Start game as an authenticated user

- Navigate to /
- Log in to auth. provider (Firebase)
- Choose "Create Game"
- Pick options (board size, listed, numPlayers=2, black or white)
- Game is created
- Game is joined
- Navigate to /game/...
- One player listed as Joined in the UI
- Wait for opponent to join...

### Flow 2: Join game as an authenticated user

- Navigate to /
- Log in to auth. provider (Firebase)
- Choose existing listed game
- Game is joined
- Navigate to /game/...
- Two players listed as Joined in the UI
