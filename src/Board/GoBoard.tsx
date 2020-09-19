import * as React from 'react';

import { GameState, Moves } from '../types';
import useStyles from './useStyles';
import BackgroundGrid from './BackgroundGrid';
import Grid from './Grid';

type GoBoardProps = {
  G: GameState;
  moves: Moves;
};

const GoBoard = ({ G, moves }: GoBoardProps) => {
  const classes = useStyles();

  return (
    <div className={classes.board}>
      <div className={classes.boardInner}>
        <BackgroundGrid size={G.cells.length} />
        <Grid cells={G.cells} onClickCell={moves.clickCell} />
      </div>
    </div>
  );
};

export default GoBoard;
