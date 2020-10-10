import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import ProfileAvatar from '../components/ProfileAvatar';

type Props = {
  displayName?: string;
  photoURL?: string;
};

const useStyles = makeStyles({
  name: {
    flexGrow: 1,
    margin: '0 10px',
  },
});

const PlayerSummary = ({ displayName, photoURL }: Props) => {
  const classes = useStyles();

  return (
    <>
      <ProfileAvatar displayName={displayName} photoURL={photoURL} />

      <Typography className={classes.name} variant="h6" component="h3">
        {displayName}
      </Typography>
    </>
  );
};

export default PlayerSummary;
