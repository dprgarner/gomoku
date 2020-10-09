import * as React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';

import useJoinMatch from '../useJoinMatch';

type Props = {
  availableSeat: '0' | '1' | null;
  matchID: string;
};

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    textAlign: 'center',
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flex: '0 0  50%',
    margin: 10,
  },
}));

const CtaButtons = ({ availableSeat, matchID }: Props) => {
  const joinMatch = useJoinMatch();
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.buttonContainer}>
      {availableSeat !== null && (
        <Button
          className={classes.button}
          color="primary"
          onClick={async () => {
            await joinMatch(matchID, availableSeat);
            window.location.reload();
          }}
          variant="contained"
        >
          Join Game
        </Button>
      )}
      <Button
        className={classes.button}
        color="secondary"
        onClick={() => {
          history.push('/');
        }}
        variant="contained"
      >
        Return to Lobby
      </Button>
    </div>
  );
};

export default CtaButtons;
