import * as React from 'react';
import { Ctx } from 'boardgame.io';

import { GameState, Moves } from '~/shared/types';
import SetLoadingBackdrop from '~/client/context/loading/SetLoadingBackdrop';

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
  playerID: string | null;
};

const MatchPage = ({
  G,
  ctx,
  moves,
  isActive,
  isConnected,
  playerID,
}: Props) => {
  const [showNumbers, setShowNumbers] = React.useState(false);
  if (playerID !== '0' && playerID !== '1' && playerID !== null) {
    throw new Error('Unrecognised player');
  }
  if (ctx.currentPlayer !== '0' && ctx.currentPlayer !== '1') {
    throw new Error('Unrecognised player');
  }

  return (
    <>
      {!isConnected && <SetLoadingBackdrop />}

      <StatusPaper
        currentPlayer={ctx.currentPlayer}
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
