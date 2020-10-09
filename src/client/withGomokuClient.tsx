import * as React from 'react';

import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

import { useCredentials, useProfile } from './context/firebaseUser';
import game from '~/shared/game';
import SetLoadingBackdrop from '~/client/context/loading/SetLoadingBackdrop';
import { server, serverRoot } from '~/client/config';

type Props = {
  matchID: string;
};

type Players = Array<{
  id: number;
  data?: { uid: string };
}>;

const useMatchPlayers = (matchID: string) => {
  const [players, setPlayers] = React.useState<Players | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        setPlayers(null);
        const response = await window.fetch(
          `${serverRoot}/games/gomoku/${matchID}`,
        );
        const { players } = await response.json();
        setPlayers(players);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [matchID]);

  return players;
};

const usePlayerID = (matchID: string) => {
  const profile = useProfile();
  const players = useMatchPlayers(matchID);

  if (!players) {
    return { loading: true };
  }

  if (!profile) {
    return { loading: false };
  }
  for (const player of players) {
    if (player.data?.uid === profile.uid) {
      return { loading: false, playerID: `${player.id}` };
    }
  }

  return { loading: false };
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
