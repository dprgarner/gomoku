import * as React from 'react';
import { makeStyles, Paper, Backdrop, Modal } from '@material-ui/core';

import FadeIn from '../../FadeIn';
import { EmailLoginButton } from '../loginButtons';
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

  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: -12,
  },
}));

type Props = {
  onLoginComplete: () => void;
};

const EmailLoginModal = ({ onLoginComplete }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <>
      <EmailLoginButton noDelay onClick={() => setIsOpen(true)} />
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 350 }}
      >
        <div className={classes.emailBody}>
          <FadeIn>
            <Paper elevation={3} className={classes.paper}>
              <form className={classes.form}>
                <EmailForm
                  onCancel={() => setIsOpen(false)}
                  onError={() => setIsOpen(false)}
                  onLoginComplete={onLoginComplete}
                />
              </form>
            </Paper>
          </FadeIn>
        </div>
      </Modal>
    </>
  );
};

export default EmailLoginModal;
