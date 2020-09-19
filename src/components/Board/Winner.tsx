import * as React from 'react';
import { Ctx } from 'boardgame.io';

type WinnerProps = {
  gameover: Ctx['gameover'];
};

const Winner = ({ gameover }: WinnerProps) => (
  <div>
    {gameover ? (
      gameover.winner !== undefined ? (
        `Winner: ${gameover.winner}`
      ) : (
        'Draw!'
      )
    ) : (
      <br />
    )}
  </div>
);

export default Winner;
