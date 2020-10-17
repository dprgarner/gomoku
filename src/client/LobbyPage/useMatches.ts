import * as React from 'react';

import { SerializedLobbyMatch } from '~/shared/types';
import { serverRoot } from '../config';
import useUsersById from '../context/useUsersById';

const flatten = <T extends unknown>(arrayOfArrays: T[][]) =>
  ([] as T[]).concat(...arrayOfArrays);

const tuple = <T extends Record<string, unknown>[]>(...args: T) => args;

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
    return matches
      .map((match) => ({
        ...match,
        players: tuple(
          {
            id: '0',
            data:
              (match.players[0].data?.uid &&
                usersById[match.players[0].data?.uid]) ||
              undefined,
          },
          {
            id: '1',
            data:
              (match.players[1].data?.uid &&
                usersById[match.players[1].data?.uid]) ||
              undefined,
          },
        ),
      }))
      .sort((match1, match2) => match2.createdAt - match1.createdAt);
  }

  return null;
};

export default useMatches;
