import * as React from 'react';

import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

import { useCredentials } from './context/firebaseUser';
import game from '~/shared/game';
import SetLoadingBackdrop from '~/client/context/loading/SetLoadingBackdrop';

const server =
  process.env.NODE_ENV === 'development' ? 'localhost:8000' : undefined;

type Props = {
  matchID: string;
  playerID: string;
};

const getDisplayName = <P extends unknown>(WrappedComponent: React.FC<P>) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

// Typing is still broken for Client.board as of v0.40. :(
// The type of Board should _probably_ be React.FC<BoardProps<GameState>>.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withGomokuClient = (BoardComponent: any) => {
  const GomokuClient = Client({
    game,
    board: BoardComponent,
    multiplayer: SocketIO({
      server,
    }),
    debug: false,

    loading: SetLoadingBackdrop,
  });

  const Component: React.FC<Props> = (props: Props) => {
    const credentials = useCredentials();
    if (!credentials) return <SetLoadingBackdrop />;
    return <GomokuClient {...props} credentials={credentials} />;
  };

  Component.displayName = `WithGomokuClient(${getDisplayName(Component)})`;

  return Component;
};

export default withGomokuClient;
