import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

import useJoinMatch from '../context/useJoinMatch';
import MiscError from '../components/MiscError';

type Props = {
  matchID: string;
  playerID: '0' | '1';
  displayName?: string;
};

const usePlayMatch = (
  matchID: string,
  playerID: '0' | '1',
  callback: (e?: Error) => void,
) => {
  const history = useHistory();
  const joinMatch = useJoinMatch();

  const playMatch = async () => {
    try {
      await joinMatch(matchID, playerID);
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
  return playMatch;
};

const PlayButton = ({ matchID, playerID, displayName }: Props) => {
  const [error, setError] = React.useState<string | null>(null);

  const playMatch = usePlayMatch(matchID, playerID, (err?: Error) => {
    if (err) setError(err.message);
  });

  return (
    <>
      {error && <MiscError error={error} onClose={() => setError(null)} />}
      <Button
        size="medium"
        color="primary"
        variant="contained"
        onClick={() => {
          playMatch();
        }}
      >
        Play {displayName || 'Stranger'}
      </Button>
    </>
  );
};

export default PlayButton;
