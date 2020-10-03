import * as React from 'react';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
  },

  button: {
    flex: '1 0 auto',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(2),
    position: 'relative',

    '&:last-child': {
      marginRight: 0,
    },
  },

  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: -12,
  },
}));

type Props = {
  onCancel: () => void;
  onNext: () => void;
  nextText: string;
  isLoading: boolean;
};

const NavButtons = ({ onCancel, onNext, nextText, isLoading }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonGroup}>
      <Button
        className={classes.button}
        color="secondary"
        variant="contained"
        onClick={onCancel}
      >
        Cancel
      </Button>

      <Button
        className={classes.button}
        color="primary"
        disabled={isLoading}
        onClick={onNext}
        variant="contained"
      >
        {nextText}
        {isLoading && (
          <CircularProgress size={24} className={classes.spinner} />
        )}
      </Button>
    </div>
  );
};

export default NavButtons;
