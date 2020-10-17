import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

import FadeIn from '~/client/components/FadeIn';
import MiscError from '../components/MiscError';
import useCreateMatch from './useCreateMatch';
import SetLoadingBackdrop from '../context/loading/SetLoadingBackdrop';
import MatchCard from './MatchCard';
import useMatches from './useMatches';

const useStyles = makeStyles((theme) => ({
  lobby: {
    margin: theme.spacing(4),
  },

  buttonContainer: {
    marginBottom: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const Lobby = () => {
  const classes = useStyles();
  const [error, setError] = React.useState('');
  const createMatch = useCreateMatch((error?: Error) => {
    if (error) {
      console.error(error);
      setError(error.message);
    }
  });
  const matches = useMatches();

  if (!matches) return <SetLoadingBackdrop />;

  return (
    <FadeIn>
      <div className={classes.lobby}>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={createMatch}
          >
            Create new game
          </Button>
        </div>

        <Grid container spacing={4}>
          {matches.map((match) => (
            <MatchCard {...match} key={match.matchID} />
          ))}
        </Grid>
        {error && <MiscError error={error} onClose={() => setError('')} />}
      </div>
    </FadeIn>
  );
};

export default Lobby;
