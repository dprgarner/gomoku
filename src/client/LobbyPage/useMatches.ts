import * as React from 'react';

import { SerializedLobbyMatch } from '~/shared/types';
import { serverRoot } from '../config';
import useUsersById from '../context/useUsersById';

const flatten = <T extends unknown>(arrayOfArrays: T[][]) =>
  ([] as T[]).concat(...arrayOfArrays);

const useMatches = () => {
  const [error, setError] = React.useState();
  if (error) throw error;
  const [matches, setMatches] = React.useState<null | SerializedLobbyMatch[]>(
    null,
  );
  React.useEffect(() => {
    (async () => {
      try {
        const gamesResponse = await window.fetch(`${serverRoot}/games/gomoku`);
        setMatches((await gamesResponse.json()).matches);
      } catch (e) {
        setError(e);
      }
    })();
  }, []);

  const userUids = React.useMemo(
    () =>
      matches &&
      flatten(
        matches.map((match) =>
          match.players.map((player) => player?.data?.uid),
        ),
      ),
    [matches],
  );
  const usersById = useUsersById(userUids);
  if (matches && usersById) {
    return matches.map((match) => ({
      ...match,
      players: match.players.map((player) => ({
        id: player.id,
        data: (player.data?.uid && usersById[player.data?.uid]) || undefined,
      })),
    }));
  }

  return null;
};

export default useMatches;
