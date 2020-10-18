import { useHistory } from 'react-router';

import { serverRoot } from '../config';
import useJoinMatch from '../context/useJoinMatch';

type Options = {
  player: '0' | '1';
  boardSize: 15 | 19;
  unlisted: boolean;
};

const useCreateMatch = () => {
  const history = useHistory();
  const joinMatch = useJoinMatch();

  const createMatch = async (
    options: Options,
    callback: (error?: Error) => void,
  ) => {
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
              size: options.boardSize,
              movesInARow: 5,
            },
            unlisted: options.unlisted,
          }),
        },
      );
      const { matchID } = await createResponse.json();
      await joinMatch(matchID, options.player);

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
