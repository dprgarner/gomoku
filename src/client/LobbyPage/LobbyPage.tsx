import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, Tab, Tabs } from '@material-ui/core';

import FadeIn from '~/client/components/FadeIn';
import MiscError from '../components/MiscError';
import SetLoadingBackdrop from '../context/loading/SetLoadingBackdrop';
import MatchCard from './MatchCard';
import useMatches from './useMatches';
import { useProfile } from '../context/firebaseUser';
import CreateMatchModal from './CreateMatchModal';

const useStyles = makeStyles((theme) => ({
  lobby: {
    margin: theme.spacing(4),
  },

  tabsPaper: {
    marginBottom: theme.spacing(4),
  },

  buttonContainer: {
    marginBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const hasCurrentPlayer = (
  uid: string,
  players: { data?: { uid: string } }[],
) => {
  for (const player of players) {
    if (player.data?.uid === uid) {
      return true;
    }
  }
  return false;
};

const hasSpace = (players: { data?: { uid: string } }[]) => {
  for (const player of players) {
    if (!player.data) {
      return true;
    }
  }
  return false;
};

const partitionMatches = <M extends { players: { data?: { uid: string } }[] }>(
  uid: string,
  matches: M[],
) => {
  const playerMatches: M[] = [];
  const openMatches: M[] = [];
  const filledMatches: M[] = [];

  matches.forEach((match) => {
    if (hasCurrentPlayer(uid, match.players)) {
      playerMatches.push(match);
    } else if (hasSpace(match.players)) {
      openMatches.push(match);
    } else {
      filledMatches.push(match);
    }
  });

  return [playerMatches, openMatches, filledMatches];
};

const Lobby = () => {
  const classes = useStyles();
  const [error, setError] = React.useState('');
  const matches = useMatches();
  const user = useProfile();
  const [tab, setTab] = React.useState<0 | 1 | 2>(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (!matches || !user) return <SetLoadingBackdrop />;

  const [playerMatches, openMatches, filledMatches] = partitionMatches(
    user.uid,
    matches,
  );

  return (
    <FadeIn>
      <div className={classes.lobby}>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setIsModalOpen(true)}
          >
            Create a new game
          </Button>
          <CreateMatchModal
            isOpen={isModalOpen}
            onError={(e) => {
              setIsModalOpen(false);
              console.error(e);
              setError(e?.message || 'Something went wrong.');
            }}
            onClose={() => setIsModalOpen(false)}
          />
        </div>

        <Paper className={classes.tabsPaper}>
          <Tabs
            value={tab}
            onChange={(_, idx) => setTab(idx)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Your Games" />
            <Tab label="Open Games" />
            <Tab label="Filled Games" />
          </Tabs>
        </Paper>

        <Grid container spacing={4}>
          {[playerMatches, openMatches, filledMatches][tab].map((match) => (
            <MatchCard {...match} key={match.matchID} />
          ))}
        </Grid>
        {error && <MiscError error={error} onClose={() => setError('')} />}
      </div>
    </FadeIn>
  );
};

export default Lobby;
