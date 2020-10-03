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
  backText: string;
  nextText: string;
  isLoading: boolean;
  onBack: () => void;
};

const NavButtons = ({ backText, nextText, isLoading, onBack }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonGroup}>
      <Button
        className={classes.button}
        color="secondary"
        variant="contained"
        onClick={onBack}
      >
        {backText}
      </Button>

      <Button
        className={classes.button}
        color="primary"
        disabled={isLoading}
        type="submit"
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
