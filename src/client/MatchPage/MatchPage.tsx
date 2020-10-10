import * as React from 'react';
import { Ctx } from 'boardgame.io';
import { Grid } from '@material-ui/core';

import { GameState, Moves } from '~/shared/types';
import SetLoadingBackdrop from '~/client/context/loading/SetLoadingBackdrop';

import StatusPaper from './StatusPaper';
import GoBoard from './GoBoard';
import SettingsPaper from './SettingsPaper';
import CtaButtons from './CtaButtons';
import GoStoneCell from './GoStoneCell';
import Stone from '../components/Stone';

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
  const { currentPlayer } = ctx;

  if (playerID !== '0' && playerID !== '1' && playerID !== null) {
    throw new Error('Unrecognised player');
  }
  if (currentPlayer !== '0' && currentPlayer !== '1') {
    throw new Error('Unrecognised player');
  }

  const availableSeat = getAvailableSeat(playerID, matchData);

  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <StatusPaper
          currentPlayer={currentPlayer}
          playerID={playerID}
          gameover={ctx.gameover}
        />

        <SettingsPaper
          showNumbers={showNumbers}
          setShowNumbers={setShowNumbers}
        >
          <CtaButtons availableSeat={availableSeat} matchID={matchID} />
        </SettingsPaper>
      </Grid>

      <Grid item xs={12} md={9}>
        {!isConnected && <SetLoadingBackdrop />}

        <GoBoard size={G.size}>
          {(rowIndex: number, colIndex: number) => (
            <GoStoneCell
              ghostPlayer={isActive ? currentPlayer : null}
              stonePlayer={G.cells[rowIndex][colIndex]}
              turnNumber={
                showNumbers ? G.turnNumbers[rowIndex][colIndex] : null
              }
              onClick={() => moves.clickCell(rowIndex, colIndex)}
            />
          )}
        </GoBoard>
      </Grid>
    </Grid>
  );
};

export default MatchPage;
