import * as React from 'react';
import { Ctx } from 'boardgame.io';

import { GameState, Moves } from '~/types';

import GoBoard from './GoBoard';
import StatusPaper from './StatusPaper';

type BoardProps = {
  G: GameState;
  ctx: Ctx;
  moves: Moves;
};

const Board: React.FC<BoardProps> = ({ G, ctx, moves }: BoardProps) => {
  return (
    <>
      <StatusPaper currentPlayer={ctx.currentPlayer} gameover={ctx.gameover} />
      <GoBoard G={G} ctx={ctx} moves={moves} />
    </>
  );
};

export default Board;
