import { useHistory } from 'react-router';

import { serverRoot } from '../config';
import useJoinMatch from '../context/useJoinMatch';

const useCreateMatch = (callback: (error?: Error) => void) => {
  const history = useHistory();
  const joinMatch = useJoinMatch();
  const createMatch = async () => {
    try {
      const createResponse = await window.fetch(
        `${serverRoot}/games/gomoku/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numPlayers: 2,
            setupData: {
              size: 15,
              movesInARow: 5,
            },
          }),
        },
      );
      const { matchID } = await createResponse.json();
      await joinMatch(matchID, '0');

      history.push({
        pathname: `/match/${matchID}`,
      });
    } catch (e) {
      if (e) {
        callback(e);
        return;
      }
    }
    callback();
  };
  return createMatch;
};

export default useCreateMatch;
