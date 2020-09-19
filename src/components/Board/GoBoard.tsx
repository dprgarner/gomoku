import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Ctx } from 'boardgame.io';

import { GameState, Moves } from '~/types';

import BackgroundGrid from './BackgroundGrid';
import Grid from './Grid';
import { squareSize } from './constants';

type GoBoardProps = {
  G: GameState;
  ctx: Ctx;
  moves: Moves;
};

const useStyles = makeStyles((theme) => ({
  board: {
    background: '#EEBB1C',
    padding: 2 * squareSize,
    borderRadius: 10,
    border: '1px solid #886307',
    '-webkit-box-shadow': '5px 5px 15px 0px rgba(0,0,0,0.35)',
    '-moz-box-shadow': '5px 5px 15px 0px rgba(0,0,0,0.35)',
    'box-shadow': '5px 5px 15px 0px rgba(0,0,0,0.35)',

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
