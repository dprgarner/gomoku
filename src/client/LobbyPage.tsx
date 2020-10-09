import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router';

import FadeIn from '~/client/components/FadeIn';
import MiscError from './components/MiscError';
import { serverRoot } from './config';
import useJoinMatch from './useJoinMatch';

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
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = React.useState('');
  const joinMatch = useJoinMatch();

  const createGame = async () => {
    try {
      const createResponse = await window.fetch(
        `${serverRoot}/games/gomoku/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numPlayers: 2,
            setupData: {
              size: 15,
              movesInARow: 5,
            },
          }),
        },
      );
      const { matchID } = await createResponse.json();
      await joinMatch(matchID, '0');

      history.push({
        pathname: `/match/${matchID}`,
      });
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  return (
    <FadeIn>
      <div className={classes.lobby}>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={createGame}
          >
            Create new game
          </Button>
        </div>
        {/* <Grid container spacing={4}>
          <PlaceholderCard />
          <PlaceholderCard />
          <PlaceholderCard />
          <PlaceholderCard />
        </Grid> */}
        {error && <MiscError error={error} onClose={() => setError('')} />}
      </div>
    </FadeIn>
  );
};

export default Lobby;
