import * as React from 'react';
import { Ctx } from 'boardgame.io';
import { makeStyles } from '@material-ui/core/styles';

import { GameState, Moves } from './types';

type BoardProps = {
  G: GameState;
  ctx: Ctx;
  moves: Moves;
};

type WinnerProps = {
  gameover: Ctx['gameover'];
};

const Winner = ({ gameover }: WinnerProps) => (
  <div>
    {gameover ? (
      gameover.winner !== undefined ? (
        `Winner: ${gameover.winner}`
      ) : (
        'Draw!'
      )
    ) : (
      <br />
    )}
  </div>
);

const squareSize = 25;

const useStyles = makeStyles({
  board: {
    background: '#EEBB1C',
    padding: 2 * squareSize,
    borderRadius: 5,
  },

  boardInner: {
    position: 'relative',
  },

  backgroundGrid: {
    borderCollapse: 'collapse',
    border: '3px solid black',
  },

  backgroundGridCell: {
    border: '1px solid black',
    padding: squareSize,
  },

  grid: {
    borderCollapse: 'collapse',
    border: '3px solid transparent',
    position: 'absolute',
    top: -squareSize,
    left: -squareSize,
  },

  stoneCell: {
    border: '1px solid transparent',
    padding: squareSize,
    position: 'relative',
  },

  stone: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 1,
    borderRadius: squareSize,

    '&:hover': {
      // background: 'hotpink',
    },
  },

  whiteStone: {
    border: '1px solid #333',
    background:
      'linear-gradient(135deg, rgba(238,238,238,1) 25%, rgba(238,238,238,1) 65%, rgba(204,204,204,1) 100%);',
  },

  blackStone: {
    border: '1px solid #333',
    background:
      'linear-gradient(315deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(111,111,111,1) 100%);',
  },
});

const range = (n: number) => [...new Array(n)].map((_, i) => i);

type BackgroundGridProps = {
  size: number;
};

const BackgroundGrid = ({ size }: BackgroundGridProps) => {
  const classes = useStyles();
  return (
    <table className={classes.backgroundGrid}>
      <tbody>
        {range(size - 1).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {range(size - 1).map((_, colIndex) => (
              <td key={colIndex} className={classes.backgroundGridCell} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

type StoneColumnProps = {
  onClick: () => void;
  cell: string | null;
};

const StoneCell = ({ cell, onClick }: StoneColumnProps) => {
  const classes = useStyles();
  return (
    <td className={classes.stoneCell} onClick={onClick}>
      {cell !== null && (
        <div
          className={`
          ${classes.stone}
          ${classes[cell === '1' ? 'whiteStone' : 'blackStone']}`}
        />
      )}
    </td>
  );
};

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

const Board: React.FC<BoardProps> = ({ G, ctx, moves }: BoardProps) => {
  const classes = useStyles();

  return (
    <>
      <Winner gameover={ctx.gameover} />

      <div className={classes.board}>
        <div className={classes.boardInner}>
          <BackgroundGrid size={G.cells.length} />

          <Grid cells={G.cells} onClickCell={moves.clickCell} />
        </div>
      </div>
    </>
  );
};

export default Board;
