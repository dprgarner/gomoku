import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

type Props = {
  error: string;
  onClose: () => void;
};

const MiscError = ({ error, onClose }: Props) => (
  <Dialog open onClose={onClose}>
    <DialogTitle>{'Oh no'}</DialogTitle>
    <DialogContent>
      <DialogContentText>{error}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary" autoFocus>
        {'Try again'}
      </Button>
    </DialogActions>
  </Dialog>
);

export default MiscError;
