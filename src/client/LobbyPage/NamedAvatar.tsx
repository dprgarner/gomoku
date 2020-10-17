import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ProfileAvatar, { ProfileAvatarProps } from '../components/ProfileAvatar';

const useStyles = makeStyles((theme) => ({
  name: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

type Props = ProfileAvatarProps;

const NamedAvatar = ({ displayName, photoURL }: Props) => {
  const classes = useStyles();

  return (
    <>
      <ProfileAvatar displayName={displayName} photoURL={photoURL} />

      <Typography className={classes.name} variant="h5" component="h2">
        {displayName || 'Stranger'}
      </Typography>
    </>
  );
};

export default NamedAvatar;
