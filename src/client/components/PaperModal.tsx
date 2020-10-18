import * as React from 'react';
import { makeStyles, Paper, Backdrop, Modal } from '@material-ui/core';

import FadeIn from '~/client/components/FadeIn';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const useStyles = makeStyles((theme) => ({
  modalBody: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },

  paper: {
    padding: theme.spacing(4),
    pointerEvents: 'auto',
  },
}));

const PaperModal = ({ isOpen, onClose, children }: Props) => {
  const classes = useStyles();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 350 }}
    >
      <div className={classes.modalBody}>
        <FadeIn>
          <Paper elevation={3} className={classes.paper}>
            {children}
          </Paper>
        </FadeIn>
      </div>
    </Modal>
  );
};

export default PaperModal;
