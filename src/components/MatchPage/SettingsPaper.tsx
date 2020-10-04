import * as React from 'react';
import {
  FormControlLabel,
  Switch,
  FormControl,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';

import choose from '~/choose';

import SmallPaper from './SmallPaper';

type SettingsPaperProps = {
  showNumbers: boolean;
  setShowNumbers: React.Dispatch<React.SetStateAction<boolean>>;
};

const useStyles = makeStyles((theme) => ({
  link: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
}));

const SettingsPaper = ({ showNumbers, setShowNumbers }: SettingsPaperProps) => {
  const { matchID = null, playerID = null } =
    useRouteMatch<{
      matchID: string;
      playerID: string;
    }>('/match/:matchID/player/:playerID')?.params || {};
  const opponentID = playerID === '0' ? '1' : '0';

  const classes = useStyles();
  return (
    <SmallPaper>
      <div className={classes.link}>
        <Typography>
          <Link
            component={RouterLink}
            to={`/match/${choose(100)}/player/${choose(2)}`}
          >
            Start new game
          </Link>
        </Typography>
      </div>
      <div className={classes.link}>
        <Typography>
          <Link
            component={RouterLink}
            to={`/match/${matchID}/player/${opponentID}`}
          >
            Play as Opponent
          </Link>
        </Typography>
      </div>

      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Switch
              checked={showNumbers}
              onChange={() => setShowNumbers((s) => !s)}
              name="showNumbers"
              color="primary"
            />
          }
          label="Show Turn Numbers"
        />
      </FormControl>
    </SmallPaper>
  );
};

export default SettingsPaper;
