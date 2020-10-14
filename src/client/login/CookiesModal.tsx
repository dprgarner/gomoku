import * as React from 'react';
import {
  Backdrop,
  Button,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from '@material-ui/core';

import FadeIn from '../components/FadeIn';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const useStyles = makeStyles((theme) => ({
  cookiesModalBody: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },

  paper: {
    padding: theme.spacing(2),
    pointerEvents: 'auto',
  },

  list: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    width: 400,
  },

  listItem: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  buttonContainer: {
    textAlign: 'center',
  },
}));

const CookiesModal = ({ isOpen, onClose }: Props) => {
  const classes = useStyles();
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 350 }}
    >
      <div className={classes.cookiesModalBody}>
        <FadeIn>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h4" style={{ textAlign: 'center' }}>
              Personal data
            </Typography>

            <ul className={classes.list}>
              <li className={classes.listItem}>
                This app uses cookies to track the identities of users, both
                when logged in with third-party identity providers and when
                browsing and playing games anonymously.
              </li>

              <li className={classes.listItem}>
                The app also stores personal data provided at initial log-in
                time by the user or by the third-party identity provider. This
                includes the user&apos;s picture and display name. This is
                stored purely so that users can see who they are playing
                against, and is not used for any other purpose.
              </li>

              <li className={classes.listItem}>
                You can delete your account and all personal data associated
                with your account at any time on the profile page (available in
                the menu in the top-right when logged in.)
              </li>

              <li className={classes.listItem}>
                If you have any more queries or issues, please raise them on the{' '}
                <a
                  href="https://github.com/dprgarner/gomoku/issues"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github repo.
                </a>
              </li>
            </ul>

            <div className={classes.buttonContainer}>
              <Button variant="contained" color="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </Paper>
        </FadeIn>
      </div>
    </Modal>
  );
};

export default CookiesModal;