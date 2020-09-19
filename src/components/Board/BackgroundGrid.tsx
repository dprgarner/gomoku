import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { squareSize } from './constants';

type BackgroundGridProps = {
  size: number;
};

const useStyles = makeStyles({
  background: {
    borderCollapse: 'collapse',
    border: '3px solid black',
  },

  cell: {
    border: '1px solid black',
    padding: squareSize,
  },
});

const range = (n: number) => [...new Array(n)].map((_, i) => i);

const BackgroundGrid = ({ size }: BackgroundGridProps) => {
  const classes = useStyles();
  return (
    <table className={classes.background}>
      <tbody>
        {range(size - 1).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {range(size - 1).map((_, colIndex) => (
              <td key={colIndex} className={classes.cell} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BackgroundGrid;
