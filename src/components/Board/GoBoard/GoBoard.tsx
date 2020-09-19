import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import GoBoardGrid from './GoBoardGrid';
import range from './range';
import { boardGridBorderWidth, squareSize } from './constants';

import woodImage from './wood.jpg';

type GoBoardProps = {
  /**
   * Render-prop for the interactive stone components. This is done to keep
   * GoBoard and its child components agnostic of the overall game state.
   */
  children: (rowIndex: number, colIndex: number) => React.ReactNode;
  size: number;
};

const boxShadow = '4px 4px 12px 0px rgba(0,0,0,0.75)';

const useStyles = makeStyles((theme) => ({
  board: {
    background: '#EEBB1C',
    backgroundImage: `url(${woodImage})`,
    backgroundSize: 'cover',
    borderRadius: 10,
    '-webkit-box-shadow': boxShadow,
    '-moz-box-shadow': boxShadow,
    'box-shadow': boxShadow,
    margin: theme.spacing(4),
    padding: 2 * squareSize,
  },

  boardInner: {
    position: 'relative',
  },

  grid: {
    borderCollapse: 'collapse',
    border: `${boardGridBorderWidth}px solid transparent`,
    position: 'absolute',
    top: -squareSize,
    left: -squareSize,
  },
}));

const GoBoard = ({ children, size }: GoBoardProps) => {
  const classes = useStyles();
  return (
    <div className={classes.board}>
      <div className={classes.boardInner}>
        <GoBoardGrid size={size} />

        <table className={classes.grid}>
          <tbody>
            {range(size).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {range(size).map((_, colIndex) => (
                  <React.Fragment key={colIndex}>
                    {children(rowIndex, colIndex)}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoBoard;
