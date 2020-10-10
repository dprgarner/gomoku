import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import range from '~/shared/range';
import GoBoardCell from './GoBoardCell';

type GoBoardGridProps = {
  size: number;
};

const getStarPoints = (size: number) => {
  const points: { [point: string]: true } = {};
  const center = (size - 1) / 2;
  const starOffset = size >= 13 ? 3 : Math.floor(size / 4);

  if (size % 2 === 1) {
    points[`${center}-${center}`] = true;
  }

  if (size >= 7) {
    points[`${starOffset}-${starOffset}`] = true;
    points[`${starOffset}-${size - 1 - starOffset}`] = true;
    points[`${size - 1 - starOffset}-${starOffset}`] = true;
    points[`${size - 1 - starOffset}-${size - 1 - starOffset}`] = true;
  }

  if (size >= 15 && size % 2 === 1) {
    points[`${center}-${starOffset}`] = true;
    points[`${center}-${size - 1 - starOffset}`] = true;
    points[`${starOffset}-${center}`] = true;
    points[`${size - 1 - starOffset}-${center}`] = true;
  }

  return points;
};

const useStyles = makeStyles({
  backgroundGrid: ({ size }: GoBoardGridProps) => ({
    borderCollapse: 'collapse',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: '2px 1px 1px 2px',
    display: 'grid',
    gridArea: '2 / 2 / -2 / -2',
    gridTemplateColumns: `repeat(${size - 1}, 1fr)`,
  }),
});

const GoBoardGrid = ({ size }: GoBoardGridProps) => {
  const starPoints = getStarPoints(size);
  const classes = useStyles({ size });

  return (
    <div className={classes.backgroundGrid}>
      {range(size - 1).map((_, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {range(size - 1).map((_, colIndex) => (
            <GoBoardCell
              key={colIndex}
              hasStarPoint={!!starPoints[`${rowIndex}-${colIndex}`]}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default GoBoardGrid;
