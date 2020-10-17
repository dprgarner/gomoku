import * as React from 'react';
import { Avatar } from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';

export type ProfileAvatarProps = {
  displayName?: string;
  photoURL?: string;
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
}));

const PLACEHOLDER_NAME = 'Stranger';

const ProfileAvatar = ({ displayName, photoURL }: ProfileAvatarProps) => {
  const classes = useStyles();

  if (photoURL) {
    return <Avatar src={photoURL} alt={displayName || PLACEHOLDER_NAME} />;
  }

  if (displayName) {
    return (
      <Avatar className={classes.avatar} alt={displayName || PLACEHOLDER_NAME}>
        {displayName[0]}
      </Avatar>
    );
  }

  return (
    <Avatar className={classes.avatar} alt={PLACEHOLDER_NAME}>
      <Person fontSize="large" />
    </Avatar>
  );
};

export default ProfileAvatar;
