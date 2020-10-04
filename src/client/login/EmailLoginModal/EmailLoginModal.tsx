import * as React from 'react';
import { makeStyles, Paper, Backdrop, Modal } from '@material-ui/core';

import FadeIn from '~/client/components/FadeIn';

import EmailAddressView from './EmailAddressView';
import CreateUserView from './CreateUserView';
import EmailExistsView from './EmailExistsView';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onLoginComplete: () => void;
};

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
}));

type View = 'EMAIL' | 'CREATE' | 'EXISTS';

const EmailLoginModal = ({ isOpen, onClose, onLoginComplete }: Props) => {
  const classes = useStyles();
  const [view, setView] = React.useState<View>('EMAIL');
  const [email, setEmail] = React.useState('');

  const viewProps = {
    email: email,
    onError: onClose,
    onChangeEmail: setEmail,
  };

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
            {view === 'EMAIL' && (
              <EmailAddressView
                onBack={onClose}
                onNext={(view) => setView(view)}
                {...viewProps}
              />
            )}
            {view === 'CREATE' && (
              <CreateUserView
                onBack={() => setView('EMAIL')}
                onNext={onLoginComplete}
                {...viewProps}
              />
            )}
            {view === 'EXISTS' && (
              <EmailExistsView
                onBack={() => setView('EMAIL')}
                onNext={onLoginComplete}
                {...viewProps}
              />
            )}
          </Paper>
        </FadeIn>
      </div>
    </Modal>
  );
};

export default EmailLoginModal;
