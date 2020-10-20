# Gomoku

An implementation of Gomoku using [Boardgame.io][bgio].

https://gomoku-boardgame-io.herokuapp.com/

## Overview

[Gomoku][gomoku] is a two-player abstract strategy game played on a Go board. Players take alternating turns by placing a stone on the board, and the winner is the first player to place five adjacent stones in a line horizontally, vertically, or diagonally.

The motivation of making this app was to try out [Boardgame.io][bgio] in a simple example, as well as to investigate how to implement authentication flows for an online board game.

Players are authenticated and authorised to make games and play moves via [Firebase][firebase-auth] credentials, and can log in via email address, Google, or play anonymously.

The code is structured as a single-repo for both client and server with the same package.json and shared code and types. [Parcel][parcel] is used for bundling the frontend code, and [Material UI][mui] is used for styling. The server is the default Boardgame.io Koa server with some additional routes. Docker and is used for development and for deployment to Heroku. The app is deployed on push to master.

## Developing

```
> docker-compose up
```

In development mode, the browser app starts on port 1234.

## Production

When running in production mode, the static files are served by the same Koa server as the Board game server. For debugging this server locally, run:

```
> docker-compose -f docker-compose.prod.yml up
```

In production mode, the browser app starts on port 8000.

## Required .env variables

The Firebase service account credentials need to be provided in the `.env` file variable `ADMIN_CREDENTIALS`. These need to be base64-encoded (obtain the credentials as JSON and pipe them through `toBase64.js`).

See `process.env` in [types.d.ts](types.d.ts) for the full list of required variables. Any variable not provided in the docker-compose files should be included in a `.env` file.

[bgio]: https://boardgame.io/
[firebase-auth]: https://firebase.google.com/docs/auth
[gomoku]: https://en.wikipedia.org/wiki/Gomoku
[mui]: https://material-ui.com/
[parcel]: https://parceljs.org/
