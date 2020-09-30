import * as React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import FadeIn from './FadeIn';

const useStyles = makeStyles((theme) => ({
  welcomePage: {
    margin: theme.spacing(4),
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    textAlign: 'center',
    margin: theme.spacing(4),
    padding: theme.spacing(6),
  },

  button: {
    margin: theme.spacing(4),
  },
}));

const WelcomePage = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <FadeIn>
      <div className={classes.welcomePage}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4" component="h2" gutterBottom>
            {'Welcome, friend'}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<PersonIcon fontSize="large" />}
            size="large"
            onClick={() => {
              setTimeout(() => {
                history.push('/fake-login');
              }, 350);
            }}
          >
            Log in
          </Button>

          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<PersonOutlineIcon fontSize="large" />}
            size="large"
            onClick={() => {
              setTimeout(() => {
                history.push('/fake-lobby');
              }, 350);
            }}
          >
            Play anonymously
          </Button>
        </Paper>
      </div>
    </FadeIn>
  );
};

export default WelcomePage;
