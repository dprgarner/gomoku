import { serverRoot } from './config';
import { useCredentials, useProfile } from './context/firebaseUser';

const useJoinMatch = () => {
  const user = useProfile();
  const credentials = useCredentials();

  const joinMatch = (matchID: string, playerID: '0' | '1') =>
    window.fetch(`${serverRoot}/games/gomoku/${matchID}/join`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerID,
        playerName: ' ',
        data: {
          uid: user?.uid,
        },
      }),
    });

  return joinMatch;
};
export default useJoinMatch;
