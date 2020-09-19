import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { squareSize } from './constants';

type BackgroundGridProps = {
  size: number;
};

const starPointSize = 4;

const useStyles = makeStyles({
  background: {
    borderCollapse: 'collapse',
    border: '3px solid black',
  },

  cell: {
    border: '1px solid black',
    padding: squareSize,
    position: 'relative',
  },

  starPointCell: {
    '&:after': {
      content: '" "',
      background: 'black',
      position: 'absolute',
      top: -starPointSize,
      left: -starPointSize,
      border: `${starPointSize}px solid black`,
      borderRadius: starPointSize,
    },
  },
});

const getStarPoints = (size: number) => {
  const points: { [point: string]: true } = {};
  const center = (size - 1) / 2;
  const starOffset = size >= 13 ? 3 : Math.floor(size / 4);

  if (size % 2 === 1) {
    points[`${center}-${center}`] = true;
  }

  if (size >= 7) {
    points[`${starOffset}-${starOffset}`] = true;
    points[`${size - 1 - starOffset}-${starOffset}`] = true;
    points[`${starOffset}-${size - 1 - starOffset}`] = true;
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

const range = (n: number) => [...new Array(n)].map((_, i) => i);

const BackgroundGrid = ({ size }: BackgroundGridProps) => {
  const classes = useStyles();
  const starPoints = getStarPoints(size);

  return (
    <table className={classes.background}>
      <tbody>
        {range(size - 1).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {range(size - 1).map((_, colIndex) => (
              <td
                key={colIndex}
                className={`
                  ${classes.cell}
                  ${
                    starPoints[`${rowIndex}-${colIndex}`]
                      ? classes.starPointCell
                      : ''
                  }
                `}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BackgroundGrid;
