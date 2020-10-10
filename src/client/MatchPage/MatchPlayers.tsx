import * as React from 'react';
import { Grid } from '@material-ui/core';

import PlayerSummary from './PlayerSummary';
import PaperWithStone from './PaperWithStone';
import JoinButton from './JoinButton';

type Props = {
  matchPlayers: Array<{
    displayName?: string;
    photoURL?: string;
  }>;
  matchID: string;
  matchPlayerUids: (string | undefined)[];
  playerID: '0' | '1' | null;
};

const MatchPlayers = ({
  matchPlayers,
  matchID,
  matchPlayerUids,
  playerID,
}: Props) => {
  const [black, white] = matchPlayers;

  return (
    <Grid container spacing={4}>
      <Grid item xs={6} md={12}>
        <PaperWithStone playerID="0">
          {playerID === null && !matchPlayerUids[0] ? (
            <JoinButton matchID={matchID} playerID="0" />
          ) : (
            <PlayerSummary
              displayName={black.displayName}
              photoURL={black.photoURL}
            />
          )}
        </PaperWithStone>
      </Grid>

      <Grid item xs={6} md={12}>
        <PaperWithStone playerID="1">
          {playerID === null && !matchPlayerUids[1] ? (
            <JoinButton matchID={matchID} playerID="1" />
          ) : (
            <PlayerSummary
              displayName={white.displayName}
              photoURL={white.photoURL}
            />
          )}
        </PaperWithStone>
      </Grid>
    </Grid>
  );
};

export default MatchPlayers;
