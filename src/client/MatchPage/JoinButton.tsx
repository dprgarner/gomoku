import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import useJoinMatch from '../context/useJoinMatch';

type Props = {
  matchID: string;
  playerID: '0' | '1';
};

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
  },
});

const JoinButton = ({ matchID, playerID }: Props) => {
  const classes = useStyles();
  const joinMatch = useJoinMatch();

  return (
    <div className={classes.container}>
      <Button
        color="primary"
        onClick={async () => {
          await joinMatch(matchID, playerID);
          window.location.reload();
        }}
        variant="contained"
      >
        Join Match
      </Button>
    </div>
  );
};
export default JoinButton;
