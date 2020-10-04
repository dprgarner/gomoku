import * as React from 'react';
import { Ctx } from 'boardgame.io';

import { GameState, Moves } from '~/types';
import SetLoadingBackdrop from '~/components/loading/SetLoadingBackdrop';

import StatusPaper from './StatusPaper';
import GoBoard from './GoBoard';
import GoStone from './GoStone';
import SettingsPaper from './SettingsPaper';

type Props = {
  G: GameState;
  ctx: Ctx;
  moves: Moves;
  isActive: boolean;
  isConnected: boolean;
  playerID: string;
};

const MatchPage = ({
  G,
  ctx,
  moves,
  isActive,
  playerID,
  isConnected,
}: Props) => {
  const [showNumbers, setShowNumbers] = React.useState(false);

  return (
    <>
      {!isConnected && <SetLoadingBackdrop />}

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

export default MatchPage;
