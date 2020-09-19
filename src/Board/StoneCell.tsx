import * as React from 'react';

import useStyles from './useStyles';

type StoneCellProps = {
  onClick: () => void;
  cell: string | null;
};

const StoneCell = ({ cell, onClick }: StoneCellProps) => {
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

export default StoneCell;
