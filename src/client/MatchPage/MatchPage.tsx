import * as React from 'react';
import { Ctx } from 'boardgame.io';
import { Grid, FormControlLabel, Switch } from '@material-ui/core';

import { GameState, Moves } from '~/shared/types';
import SetLoadingBackdrop from '~/client/context/loading/SetLoadingBackdrop';
import StatusPaper from './StatusPaper';
import GoBoard from './GoBoard';
import GoStoneCell from './GoStoneCell';
import MatchPlayers from './MatchPlayers';
import useUsers from '../context/useUsers';
import MatchNav from './MatchNav';

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
  const matchPlayerUids = React.useMemo(
    () => matchData.map(({ data }) => data?.uid),
    [matchData],
  );
  const { users: matchPlayers } = useUsers(matchPlayerUids);
  const { currentPlayer } = ctx;

  if (playerID !== '0' && playerID !== '1' && playerID !== null) {
    throw new Error('Unrecognised player');
  }
  if (currentPlayer !== '0' && currentPlayer !== '1') {
    throw new Error('Unrecognised player');
  }

  return (
    <>
      <MatchNav
        matchPlayers={matchPlayers}
        settings={
          <FormControlLabel
            control={
              <Switch
                checked={showNumbers}
                onChange={() => setShowNumbers((s) => !s)}
                name="showNumbers"
                color="primary"
              />
            }
            label="Show Turn Numbers"
          />
        }
      />

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <MatchPlayers
            matchPlayers={matchPlayers}
            matchID={matchID}
            matchPlayerUids={matchPlayerUids}
            playerID={playerID}
          />

          <StatusPaper
            currentPlayer={currentPlayer}
            playerID={playerID}
            gameover={ctx.gameover}
          />
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
    </>
  );
};

export default MatchPage;
