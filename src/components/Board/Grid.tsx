import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { GameState } from '~/types';

import StoneCell from './StoneCell';
import { squareSize } from './constants';

type GridProps = {
  cells: GameState['cells'];
  currentPlayer: string;
  onClickCell: (rowIndex: number, colIndex: number) => void;
  gameover?: { winner: string };
};

const useStyles = makeStyles({
  grid: {
    borderCollapse: 'collapse',
    border: '3px solid transparent',
    position: 'absolute',
    top: -squareSize,
    left: -squareSize,
  },
});

const Grid = ({ cells, currentPlayer, gameover, onClickCell }: GridProps) => {
  const classes = useStyles();
  return (
    <table className={classes.grid}>
      <tbody>
        {cells.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <StoneCell
                key={colIndex}
                cell={cell}
                currentPlayer={currentPlayer}
                disabled={!!gameover}
                onClick={() => onClickCell(rowIndex, colIndex)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
