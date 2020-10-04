import * as React from 'react';
import {
  makeStyles,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import * as firebase from 'firebase/app';
import { useHistory } from 'react-router';

import useEncodedLocation from './context/useEncodedLocation';

type LoggedInUserMenuProps = {
  displayName: string | null;
  isAnonymous: boolean;
};

const useStyles = makeStyles((theme) => ({
  menuButtonIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4),
  },
}));

const LoggedInUserMenu = ({
  displayName,
  isAnonymous,
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

  const canLogOut = process.env.NODE_ENV === 'development' || !isAnonymous;

  return (
    <>
      <IconButton
        color="inherit"
        onClick={(e) => {
          setMenuAnchorElement(e.currentTarget);
        }}
      >
        <Typography variant="button">
          {`Welcome, ${displayName || 'stranger'}`}
        </Typography>
        <AccountCircle fontSize="large" className={classes.menuButtonIcon} />
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
