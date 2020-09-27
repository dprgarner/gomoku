import * as React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { useParams } from 'react-router-dom';

import game from '~/game';

import Board from './Board';
import SetLoadingBackdrop from './loading/SetLoadingBackdrop';

const server =
  process.env.NODE_ENV === 'development' ? 'localhost:8000' : undefined;

// Typing is still broken for Client.board as of v0.40. :(
const GomokuClient = (Client as any)({
  game,
  board: Board,
  multiplayer: SocketIO({
    server,
  }),
  debug: false,

  // For a smoother animation effect and a less jarring transition, the loading
  // backdrop is split into two components. The SetLoadingBackdrop component
  // triggers the loading effect via context; the LoadingBackdrop component
  // listens and renders the backdrop.
  loading: SetLoadingBackdrop,
});

const GomokuClientContainer = () => {
  const { matchID, playerID } = useParams<{
    matchID: string;
    playerID: string;
  }>();

  return <GomokuClient playerID={playerID} matchID={matchID} />;
};

export default GomokuClientContainer;
