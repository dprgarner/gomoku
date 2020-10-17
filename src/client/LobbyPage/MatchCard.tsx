import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { formatDistanceToNow } from 'date-fns';
import { useHistory } from 'react-router';

import MatchCardHeader, { MatchCardHeaderProps } from './MatchCardHeader';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    padding: theme.spacing(1),
  },

  cardContent: {
    minHeight: 250,
  },

  cardActions: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'flex-end',
  },
}));

type Props = {
  matchID: string;
  players: MatchCardHeaderProps['players'];
  setupData: {
    size: number;
  };
  updatedAt: number;
};

const MatchCard = ({ matchID, players, updatedAt, setupData }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid item xs={6} lg={4}>
      <Card className={classes.cardRoot}>
        <CardContent className={classes.cardContent}>
          <MatchCardHeader matchID={matchID} players={players} />

          <Typography variant="h6" component="h3">
            {`${setupData.size}x${setupData.size}`}
          </Typography>

          <Typography variant="subtitle1" component="h3">
            {`Updated ${formatDistanceToNow(updatedAt)} ago`}
          </Typography>
        </CardContent>

        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setTimeout(() => {
                history.push({
                  pathname: `/match/${matchID}`,
                });
              }, 400);
            }}
          >
            View Game
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MatchCard;
