import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, ThemeProvider } from '@material-ui/core';
import FadeIn from './FadeIn';
import { useFirebaseUser } from './firebaseUser';

const useStyles = makeStyles((theme) => ({
  lobby: {
    margin: theme.spacing(4),
  },
  buttonContainer: {
    marginBottom: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
  },
  cardRoot: {
    // maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

const PlaceholderCard = () => {
  const classes = useStyles();

  return (
    <Grid container item xs={4}>
      <Card className={classes.cardRoot}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://via.placeholder.com/345x140"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

const Lobby = () => {
  const user = useFirebaseUser();
  const classes = useStyles();

  return (
    <FadeIn>
      <div className={classes.lobby}>
        {`Welcome, ${user?.displayName || 'friend'}`}
        <div className={classes.buttonContainer}>
          <Button variant="contained" size="large" color="primary">
            Create new game
          </Button>
        </div>
        <Grid container spacing={4}>
          <PlaceholderCard />
          <PlaceholderCard />
          <PlaceholderCard />
          <PlaceholderCard />
        </Grid>
      </div>
    </FadeIn>
  );
};

export default Lobby;
