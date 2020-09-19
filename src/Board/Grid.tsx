import * as React from 'react';
import { GameState } from '../types';

import StoneCell from './StoneCell';
import useStyles from './useStyles';

type GridProps = {
  cells: GameState['cells'];
  onClickCell: (rowIndex: number, colIndex: number) => void;
};

const Grid = ({ cells, onClickCell }: GridProps) => {
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
