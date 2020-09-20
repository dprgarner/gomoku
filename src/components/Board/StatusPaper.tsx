import * as React from 'react';
import { Typography } from '@material-ui/core';
import SmallPaper from './SmallPaper';

type StatusPaperProps = {
  isActive: boolean;
  playerID: string;
  gameover?: { winner: string };
};

type TextProps = {
  children: React.ReactNode;
};

const Text = ({ children }: TextProps) => (
  <Typography variant="h5" component="h2">
    {children}
  </Typography>
);

const getStatusText = ({ isActive, playerID, gameover }: StatusPaperProps) => {
  if (gameover) {
    if (gameover.winner === playerID) return 'You have won!';
    if (gameover.winner === undefined) return 'The game is a draw.';
    return 'Your opponent has won.';
  }
  if (isActive) return 'It is your turn.';
  return "It is your oppenent's turn.";
};

const StatusPaper = ({ isActive, playerID, gameover }: StatusPaperProps) => (
  <SmallPaper>
    <Text>{`You are playing as ${playerID === '1' ? 'White' : 'Black'}.`}</Text>
    <Text>{getStatusText({ isActive, playerID, gameover })}</Text>
  </SmallPaper>
);

export default StatusPaper;
