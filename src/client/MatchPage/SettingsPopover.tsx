import * as React from 'react';
import { IconButton, Popover } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';

type ButtonPopoverProps = {
  children: React.ReactNode;
};

const SettingsPopover = ({ children }: ButtonPopoverProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const closeSettings = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="delete"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <TuneIcon />
      </IconButton>

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={closeSettings}
      >
        {children}
      </Popover>
    </div>
  );
};

export default SettingsPopover;
