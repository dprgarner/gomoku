import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Checkbox, Typography } from '@material-ui/core';
import * as firebase from 'firebase/app';
import { useHistory } from 'react-router';

import MiscError from '../components/MiscError';

const useStyles = makeStyles({
  warning: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
  },

  warningText: {
    flexGrow: 1,
  },
});

const DeleteProfile = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const [error, setError] = React.useState('');
  const history = useHistory();

  const handleDelete = async () => {
    try {
      const { currentUser } = firebase.auth();
      if (!currentUser) throw new Error('Could not find user');
      await currentUser.delete();
      history.push('/');
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  return (
    <>
      <Button
        color="secondary"
        disabled={!checked}
        variant="contained"
        onClick={handleDelete}
      >
        Delete Profile
      </Button>

      <div className={classes.warning}>
        <Typography
          variant="body2"
          component="p"
          className={classes.warningText}
        >
          This cannot be undone! Check the checkbox to confirm.
        </Typography>

        <Checkbox
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        ></Checkbox>
      </div>

      {error && <MiscError error={error} onClose={() => setError('')} />}
    </>
  );
};

export default DeleteProfile;
