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

type UserMenuProps = {
  displayName: string | null;
  isAnonymous: boolean;
};

const useStyles = makeStyles((theme) => ({
  menuButtonIcon: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4),
  },
}));

const UserMenu = ({ displayName, isAnonymous }: UserMenuProps) => {
  const [
    menuAnchorElement,
    setMenuAnchorElement,
  ] = React.useState<HTMLButtonElement | null>(null);
  const classes = useStyles();
  const isMenuOpen = !!menuAnchorElement;

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
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={isMenuOpen}
        getContentAnchorEl={null}
        onClose={() => {
          setMenuAnchorElement(null);
        }}
      >
        <MenuItem onClick={() => firebase.auth().signOut()}>Log Out</MenuItem>
        {isAnonymous && <MenuItem>Log in?</MenuItem>}
      </Menu>
    </>
  );
};

export default UserMenu;
