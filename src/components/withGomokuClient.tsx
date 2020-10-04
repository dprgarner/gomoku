import * as React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

import game from '~/game';
import SetLoadingBackdrop from '~/components/loading/SetLoadingBackdrop';

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

    // For a smoother animation effect and a less jarring transition, the loading
    // backdrop is split into two components. The SetLoadingBackdrop component
    // triggers the loading effect via context; the LoadingBackdrop component
    // listens to this and renders the backdrop.
    loading: SetLoadingBackdrop,
  });

  const Component: React.FC<Props> & { displayName: string } = (
    props: Props,
  ) => <GomokuClient {...props} />;
  Component.displayName = `WithGomokuClient(${getDisplayName(Component)})`;

  return Component;
};

export default withGomokuClient;
