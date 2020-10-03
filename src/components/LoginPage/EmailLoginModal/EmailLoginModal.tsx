import * as React from 'react';
import { makeStyles, Paper, Backdrop, Modal } from '@material-ui/core';

import FadeIn from '~/components/FadeIn';
import EmailForm from './EmailForm';

const useStyles = makeStyles(() => ({
  emailBody: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },

  paper: {
    padding: 30,
    pointerEvents: 'auto',
    width: 400,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onLoginComplete: () => void;
};

const EmailLoginModal = ({ isOpen, onClose, onLoginComplete }: Props) => {
  const classes = useStyles();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 350 }}
    >
      <div className={classes.emailBody}>
        <FadeIn>
          <Paper elevation={3} className={classes.paper}>
            <form className={classes.form}>
              <EmailForm
                onCancel={onClose}
                onError={onClose}
                onLoginComplete={onLoginComplete}
              />
            </form>
          </Paper>
        </FadeIn>
      </div>
    </Modal>
  );
};

export default EmailLoginModal;
