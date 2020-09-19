import * as React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

type StatusBarProps = {
  currentPlayer: string;
  gameover?: { winner: string };
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: theme.spacing(4),
  },

  paper: {
    padding: theme.spacing(2),
  },
}));

const gameOverText = (gameover: { winner: string }) =>
  gameover.winner !== undefined
    ? `${gameover.winner === '1' ? 'White' : 'Black'} has won!`
    : 'The game is a draw.';

const currentPlayerText = (currentPlayer: string) =>
  `It is ${currentPlayer === '1' ? "White's" : "Black's"} turn.`;

const StatusBar = ({ gameover, currentPlayer }: StatusBarProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5" component="h2">
          {gameover ? gameOverText(gameover) : currentPlayerText(currentPlayer)}
        </Typography>
      </Paper>
    </div>
  );
};

export default StatusBar;
