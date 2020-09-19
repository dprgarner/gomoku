import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Ctx } from 'boardgame.io';

import { GameState, Moves } from '~/types';

import BackgroundGrid from './BackgroundGrid';
import Grid from './Grid';
import { squareSize } from './constants';

import woodImage from './wood.jpg';

type GoBoardProps = {
  G: GameState;
  ctx: Ctx;
  moves: Moves;
};

const boxShadow = '4px 4px 12px 0px rgba(0,0,0,0.75)';

const useStyles = makeStyles((theme) => ({
  board: {
    background: '#EEBB1C',
    backgroundImage: `url(${woodImage})`,
    backgroundSize: 'cover',
    padding: 2 * squareSize,
    borderRadius: 10,
    '-webkit-box-shadow': boxShadow,
    '-moz-box-shadow': boxShadow,
    'box-shadow': boxShadow,
    margin: theme.spacing(4),
  },

  boardInner: {
    position: 'relative',
  },
}));

const GoBoard = ({ G, ctx, moves }: GoBoardProps) => {
  const classes = useStyles();

  return (
    <div className={classes.board}>
      <div className={classes.boardInner}>
        <BackgroundGrid size={G.cells.length} />
        <Grid
          currentPlayer={ctx.currentPlayer}
          cells={G.cells}
          gameover={ctx.gameover}
          onClickCell={moves.clickCell}
        />
      </div>
    </div>
  );
};

export default GoBoard;
