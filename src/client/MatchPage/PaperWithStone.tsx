import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import Stone from '../components/Stone';

type Props = {
  children: React.ReactNode;
  playerID: '0' | '1';
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },

  container: {
    alignItems: 'center',
    display: 'flex',
  },

  stone: {
    width: 40,
  },
}));

const PaperWithStone = ({ playerID, children }: Props) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.paper}>
      <div className={classes.container}>
        {children}

        <div className={classes.stone}>
          <Stone player={playerID} />
        </div>
      </div>
    </Paper>
  );
};

export default PaperWithStone;
