import * as React from 'react';
import { Ctx } from 'boardgame.io';

import { GameState, Moves } from '~/shared/types';
import SetLoadingBackdrop from '~/client/context/loading/SetLoadingBackdrop';

import StatusPaper from './StatusPaper';
import GoBoard from './GoBoard';
import GoStone from './GoStone';
import SettingsPaper from './SettingsPaper';
import CtaButtons from './CtaButtons';

type MatchData = Array<{
  id: string;
  data?: {
    uid: string;
  };
}>;

type Props = {
  G: GameState;
  ctx: Ctx;
  isActive: boolean;
  isConnected: boolean;
  matchData: MatchData;
  matchID: string;
  moves: Moves;
  playerID: string | null;
};

const getAvailableSeat = (playerID: '0' | '1' | null, matchData: MatchData) => {
  if (playerID !== null) return null;
  if (!matchData[0].data) return '0';
  if (!matchData[1].data) return '1';
  return null;
};

const MatchPage = ({
  G,
  ctx,
  isActive,
  isConnected,
  matchData,
  matchID,
  moves,
  playerID,
}: Props) => {
  const [showNumbers, setShowNumbers] = React.useState(false);

  if (playerID !== '0' && playerID !== '1' && playerID !== null) {
    throw new Error('Unrecognised player');
  }
  if (ctx.currentPlayer !== '0' && ctx.currentPlayer !== '1') {
    throw new Error('Unrecognised player');
  }

  const availableSeat = getAvailableSeat(playerID, matchData);

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

      <CtaButtons availableSeat={availableSeat} matchID={matchID} />

      <SettingsPaper
        showNumbers={showNumbers}
        setShowNumbers={setShowNumbers}
      />
    </>
  );
};

export default MatchPage;
