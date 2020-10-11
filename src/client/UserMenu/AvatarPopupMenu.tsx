import * as React from 'react';
import {
  IconButton,
  Menu,
  Typography,
  makeStyles,
  MenuItem,
} from '@material-ui/core';

import ProfileAvatar from '../components/ProfileAvatar';

type Props = {
  avatarText: string;
  menuItems: Array<{ text: string; onClick: () => void }>;
  displayName?: string;
  photoURL?: string;
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4),
  },
}));

const AvatarPopupMenu = ({
  displayName,
  photoURL,
  avatarText,
  menuItems,
}: Props) => {
  const classes = useStyles();
  const [
    menuAnchorElement,
    setMenuAnchorElement,
  ] = React.useState<HTMLButtonElement | null>(null);

  const isMenuOpen = !!menuAnchorElement;
  const handleClose = () => setMenuAnchorElement(null);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={(e) => {
          setMenuAnchorElement(e.currentTarget);
        }}
      >
        <Typography variant="button">{avatarText}</Typography>

        <div className={classes.avatar}>
          <ProfileAvatar displayName={displayName} photoURL={photoURL} />
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
        {menuItems.map(({ text, onClick }) => (
          <MenuItem
            key={text}
            onClick={() => {
              handleClose();
              onClick();
            }}
          >
            {text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AvatarPopupMenu;
