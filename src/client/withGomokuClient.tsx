import * as React from 'react';

import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

import { useCredentials, useFirebaseUser } from './context/firebaseUser';
import game from '~/shared/game';
import SetLoadingBackdrop from '~/client/context/loading/SetLoadingBackdrop';

const server =
  process.env.NODE_ENV === 'development' ? 'localhost:8000' : undefined;

type Props = {
  matchID: string;
};

const getDisplayName = <P extends unknown>(WrappedComponent: React.FC<P>) =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

type Players = Array<{
  id: number;
  data?: { uid: string };
}>;

const usePlayerID = (matchID: string) => {
  const user = useFirebaseUser();
  const [players, setPlayers] = React.useState<Players | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        setPlayers(null);
        const response = await window.fetch(
          `${server ? `//${server}` : ''}/games/gomoku/${matchID}`,
        );
        const { players } = await response.json();
        setPlayers(players);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [matchID]);

  if (!players) {
    return { loading: true };
  }

  if (!user) {
    return { loading: false, playerID: undefined };
  }
  for (const player of players) {
    if (player.data?.uid === user.uid) {
      return { loading: false, playerID: `${player.id}` };
    }
  }

  return { loading: false, playerID: undefined };
};

// Typing is still broken for Client.board as of v0.40. :(
// The type of Board should _probably_ be React.FC<BoardProps<GameState>>.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withGomokuClient = (BoardComponent: any) => {
  const GomokuClient = Client({
    game,
    board: BoardComponent,
    multiplayer: SocketIO({ server }),
    debug: false,
    loading: SetLoadingBackdrop,
  });

  const Component: React.FC<Props> = ({ matchID }: Props) => {
    const credentials = useCredentials();
    const { loading, playerID } = usePlayerID(matchID);
    if (!credentials || loading) return <SetLoadingBackdrop />;

    return (
      <GomokuClient
        matchID={matchID}
        playerID={playerID}
        credentials={credentials}
      />
    );
  };

  Component.displayName = `WithGomokuClient(${getDisplayName(Component)})`;

  return Component;
};

export default withGomokuClient;
