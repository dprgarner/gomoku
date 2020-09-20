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
  isActive: boolean;
  playerID: string;
};

const Board = ({ G, ctx, moves, isActive, playerID }: BoardProps) => {
  const [showNumbers, setShowNumbers] = React.useState(true);
  return (
    <>
      <StatusPaper
        isActive={isActive}
        playerID={playerID}
        gameover={ctx.gameover}
      />

      <GoBoard size={G.size}>
        {(rowIndex: number, colIndex: number) => (
          <GoStone
            stonePlayer={G.cells[rowIndex][colIndex]}
            turnNumber={showNumbers ? G.turnNumbers[rowIndex][colIndex] : null}
            ghostPlayer={isActive ? ctx.currentPlayer : null}
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
