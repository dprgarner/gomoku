import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

import { useProfile } from '../context/firebaseUser';
import DeleteProfile from './DeleteProfile';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 200,
  },

  cardContainer: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
  },

  paper: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    padding: theme.spacing(2),
  },
}));

const ProfilePage = () => {
  const classes = useStyles();
  const user = useProfile();

  if (!user) throw new Error('No user profile');

  return (
    <Grid container>
      <Grid item xs={6} md={4} className={classes.cardContainer}>
        <Card className={classes.card}>
          {user.photoURL && (
            <CardMedia
              component="img"
              alt="Profile image"
              height="200"
              image={user.photoURL}
            />
          )}
          <CardContent>
            {user.displayName && (
              <Typography variant="h6" component="h2">
                {user.displayName}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6} md={8}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4" component="h2" gutterBottom>
            Your Profile
          </Typography>

          <DeleteProfile />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
