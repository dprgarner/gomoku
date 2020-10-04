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

const getGameoverText = (winner: string, playerID: string) => {
  if (winner === playerID) return 'You have won!';
  if (winner === undefined) return 'The game is a draw.';
  return 'Your opponent has won.';
};

const getCurrentTurnText = (isActive: boolean) =>
  isActive ? 'It is your turn.' : "It is your opponent's turn.";

const StatusPaper = ({ isActive, playerID, gameover }: StatusPaperProps) => (
  <SmallPaper>
    <Text>{`You are playing as ${playerID === '1' ? 'White' : 'Black'}.`}</Text>
    <Text>
      {gameover
        ? getGameoverText(gameover.winner, playerID)
        : getCurrentTurnText(isActive)}
    </Text>
  </SmallPaper>
);

export default StatusPaper;
