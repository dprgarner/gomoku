import * as React from 'react';
import { Paper, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { createPath } from 'history';

import Breadcrumbs from '~/client/components/Breadcrumbs';
import SettingsPopover from './SettingsPopover';

type Props = {
  matchPlayers: Array<{
    displayName?: string;
  }>;
  settings: React.ReactNode;
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  breadcrumbs: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const MatchNav = ({ matchPlayers, settings }: Props) => {
  const classes = useStyles();
  const matchLink = createPath(useLocation());
  const matchName = `Match: ${matchPlayers
    .map(({ displayName }) => displayName || '?')
    .join(' vs ')}`;

  return (
    <div className={classes.container}>
      <div className={classes.breadcrumbs}>
        <Breadcrumbs
          links={[
            { to: '/', text: 'Lobby' },
            { to: matchLink, text: matchName },
          ]}
        />
      </div>

      <SettingsPopover>
        <Paper className={classes.paper} elevation={16}>
          <FormControl component="fieldset">{settings}</FormControl>
        </Paper>
      </SettingsPopover>
    </div>
  );
};

export default MatchNav;
