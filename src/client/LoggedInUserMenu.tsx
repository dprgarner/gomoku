import * as React from 'react';
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import * as firebase from 'firebase/app';
import { useHistory } from 'react-router';

import useEncodedLocation from './context/useEncodedLocation';

type LoggedInUserMenuProps = {
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },

  placeholderIcon: {},
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

        {photoURL ? (
          <Avatar alt={welcomeText} src={photoURL} className={classes.avatar} />
        ) : (
          <Avatar className={classes.avatar}>
            <Person fontSize="large" />
          </Avatar>
        )}
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
