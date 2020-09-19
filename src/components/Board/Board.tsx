import * as React from 'react';
import { Ctx } from 'boardgame.io';

import { GameState, Moves } from '~/types';

import StatusPaper from './StatusPaper';
import GoBoard from './GoBoard';
import GoStone from './GoStone';
import SettingsPaper from './SettingsPaper';

type BoardProps = {
  G: GameState;
  ctx: Ctx;
  moves: Moves;
};

const Board: React.FC<BoardProps> = ({ G, ctx, moves }: BoardProps) => {
  const [showNumbers, setShowNumbers] = React.useState(true);
  return (
    <>
      <StatusPaper currentPlayer={ctx.currentPlayer} gameover={ctx.gameover} />

      <GoBoard size={G.cells.length}>
        {(rowIndex: number, colIndex: number) => (
          <GoStone
            stonePlayer={G.cells[rowIndex][colIndex]}
            turnNumber={showNumbers ? G.turnNumbers[rowIndex][colIndex] : null}
            ghostPlayer={ctx.gameover ? null : ctx.currentPlayer}
            onClick={() => moves.clickCell(rowIndex, colIndex)}
          />
        )}
      </GoBoard>

      <SettingsPaper
        showNumbers={showNumbers}
        setShowNumbers={setShowNumbers}
      />
    </>
  );
};

export default Board;
