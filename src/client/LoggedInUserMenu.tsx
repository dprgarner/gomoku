import * as React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
} from '@material-ui/core';
import * as firebase from 'firebase/app';
import { useHistory } from 'react-router';

import useEncodedLocation from './context/useEncodedLocation';
import ProfileAvatar from './components/ProfileAvatar';

type LoggedInUserMenuProps = {
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4),
  },
}));

const LoggedInUserMenu = ({
  displayName,
  isAnonymous,
  photoURL,
}: LoggedInUserMenuProps) => {
  const classes = useStyles();
  const history = useHistory();
  const redirectPath = useEncodedLocation();

  const [
    menuAnchorElement,
    setMenuAnchorElement,
  ] = React.useState<HTMLButtonElement | null>(null);

  const isMenuOpen = !!menuAnchorElement;
  const handleClose = () => setMenuAnchorElement(null);

  const canLogOut = !isAnonymous;
  const welcomeText = `Welcome, ${displayName || 'stranger'}`;

  return (
    <>
      <IconButton
        color="inherit"
        onClick={(e) => {
          setMenuAnchorElement(e.currentTarget);
        }}
      >
        <Typography variant="button">{welcomeText}</Typography>

        <div className={classes.avatar}>
          <ProfileAvatar
            displayName={displayName || undefined}
            photoURL={photoURL || undefined}
          />
        </div>
      </IconButton>

      <Menu
        anchorEl={menuAnchorElement}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        getContentAnchorEl={null}
        onClose={handleClose}
        open={isMenuOpen}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {canLogOut && (
          <MenuItem
            onClick={() => {
              handleClose();
              firebase.auth().signOut();
            }}
          >
            Log out
          </MenuItem>
        )}
        {isAnonymous && (
          <MenuItem
            onClick={() => {
              handleClose();
              history.push(`/add-login-method?redirect=${redirectPath}`);
            }}
          >
            Log in
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default LoggedInUserMenu;
