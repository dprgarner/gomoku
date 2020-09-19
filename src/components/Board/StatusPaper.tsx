import * as React from 'react';
import { Typography } from '@material-ui/core';
import SmallPaper from './SmallPaper';

type StatusPaperProps = {
  currentPlayer: string;
  gameover?: { winner: string };
};

const gameOverText = (gameover: { winner: string }) =>
  gameover.winner !== undefined
    ? `${gameover.winner === '1' ? 'White' : 'Black'} has won!`
    : 'The game is a draw.';

const currentPlayerText = (currentPlayer: string) =>
  `It is ${currentPlayer === '1' ? "White's" : "Black's"} turn.`;

const StatusPaper = ({ gameover, currentPlayer }: StatusPaperProps) => (
  <SmallPaper>
    <Typography variant="h5" component="h2">
      {gameover ? gameOverText(gameover) : currentPlayerText(currentPlayer)}
    </Typography>
  </SmallPaper>
);

export default StatusPaper;
