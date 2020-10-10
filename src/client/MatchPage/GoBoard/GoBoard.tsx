import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import range from '~/shared/range';
import woodImage from './wood.jpg';
import GoBoardGrid from './GoBoardGrid';

type GoBoardProps = {
  /**
   * Render-prop for the interactive stone components. A render prop is used to
   * keep GoBoard and its child components agnostic of the overall game state
   * and to separate out the presentational details of the Go Board.
   */
  children: (rowIndex: number, colIndex: number) => React.ReactNode;
  size: number;
};

const boxShadow = '4px 4px 12px 0px rgba(0,0,0,0.75)';

type StyleProps = {
  size: number;
};

const useStyles = makeStyles((theme) => ({
  board: {
    background: '#EEBB1C',
    backgroundImage: `url(${woodImage})`,
    backgroundSize: 'cover',
    borderRadius: 10,
    '-webkit-box-shadow': boxShadow,
    '-moz-box-shadow': boxShadow,
    'box-shadow': boxShadow,
    padding: theme.spacing(4),
    position: 'relative',
  },

  boardPositioner: ({ size }: StyleProps) => ({
    display: 'grid',
    gridTemplateColumns: `1fr ${2 * (size - 1)}fr 1fr`,
    gridTemplateRows: `1fr ${2 * (size - 1)}fr 1fr`,
    position: 'relative',
  }),

  interactiveGrid: ({ size }: StyleProps) => ({
    border: '4px solid transparent',
    borderCollapse: 'collapse',
    display: 'grid',
    gridArea: '1 / 1 / -1 / -1',
    gridTemplateColumns: `repeat(${size * 2}, 1fr)`,
    gridGap: 3,
  }),
}));

const GoBoard = ({ children, size }: GoBoardProps) => {
  const classes = useStyles({ size });

  return (
    <div className={classes.board}>
      <div className={classes.boardPositioner}>
        <GoBoardGrid size={size} />

        <div className={classes.interactiveGrid}>
          {range(size).map((_, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {range(size).map((_, colIndex) => (
                <React.Fragment key={colIndex}>
                  {children(rowIndex, colIndex)}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoBoard;
