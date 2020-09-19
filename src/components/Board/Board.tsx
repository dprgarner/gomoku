import * as React from 'react';
import { Ctx } from 'boardgame.io';

import { GameState, Moves } from '~/types';

import Winner from './Winner';
import GoBoard from './GoBoard';

type BoardProps = {
  G: GameState;
  ctx: Ctx;
  moves: Moves;
};

const Board: React.FC<BoardProps> = ({ G, ctx, moves }: BoardProps) => {
  return (
    <>
      <Winner gameover={ctx.gameover} />
      <GoBoard G={G} moves={moves} />
    </>
  );
};

export default Board;
