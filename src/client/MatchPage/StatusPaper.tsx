import * as React from 'react';
import { Typography } from '@material-ui/core';
import SmallPaper from './SmallPaper';

type StatusPaperProps = {
  currentPlayer: '0' | '1';
  playerID: '0' | '1' | null;
  gameover?: { winner?: '0' | '1' };
};

type TextProps = {
  children: React.ReactNode;
};

const Text = ({ children }: TextProps) => (
  <Typography variant="h5" component="h2">
    {children}
  </Typography>
);

const getPlayerText = (playerID: string | null) =>
  playerID
    ? `You are playing as ${playerID === '1' ? 'White' : 'Black'}.`
    : 'You are spectating.';

const getAnonymousGameoverText = (winner: '0' | '1' | undefined) => {
  if (winner === '0') return 'Black has won.';
  if (winner === '1') return 'White has won.';
  if (winner === undefined) return 'The game is a draw.';
  throw new Error('Unrecognised winner');
};

const getPersonalGameoverText = (
  playerID: '0' | '1',
  winner: '0' | '1' | undefined,
) => {
  if (winner === undefined) return 'The game is a draw.';
  if (winner === playerID) return 'You have won!';
  return 'Your opponent has won.';
};

const getGameoverText = (
  playerID: '0' | '1' | null,
  winner: '0' | '1' | undefined,
) =>
  playerID === null
    ? getAnonymousGameoverText(winner)
    : getPersonalGameoverText(playerID, winner);

const getAnonymousCurrentTurnText = (currentPlayer: '0' | '1') =>
  currentPlayer === '0' ? "It is Black's turn." : "It is White's turn.";

const getPersonalCurrentTurnText = (isActive: boolean) =>
  isActive ? 'It is your turn.' : "It is your opponent's turn.";

const getCurrentTurnText = (
  playerID: '0' | '1' | null,
  currentPlayer: '0' | '1',
) =>
  playerID === null
    ? getAnonymousCurrentTurnText(currentPlayer)
    : getPersonalCurrentTurnText(playerID === currentPlayer);

const StatusPaper = ({
  currentPlayer,
  playerID,
  gameover,
}: StatusPaperProps) => {
  return (
    <SmallPaper>
      <Text>{getPlayerText(playerID)}</Text>
      <Text>
        {gameover
          ? getGameoverText(playerID, gameover.winner)
          : getCurrentTurnText(playerID, currentPlayer)}
      </Text>
    </SmallPaper>
  );
};

export default StatusPaper;
