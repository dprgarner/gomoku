import * as React from 'react';
import useStyles from './useStyles';

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

export default BackgroundGrid;
