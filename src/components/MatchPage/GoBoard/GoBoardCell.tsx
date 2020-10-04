import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { squareSize } from './constants';

const starPointSize = 4;

type GoBoardCellProps = {
  hasStarPoint: boolean;
};

type StyleProps = {
  hasStarPoint: boolean;
};

const useStyles = makeStyles({
  cell: ({ hasStarPoint }: StyleProps) => ({
    border: '1px solid black',
    padding: squareSize,
    position: 'relative',

    '&:after': hasStarPoint
      ? {
          background: 'black',
          border: `${starPointSize}px solid black`,
          borderRadius: starPointSize,
          content: '""',
          left: -starPointSize,
          position: 'absolute',
          top: -starPointSize,
        }
      : {},
  }),
});

const GoBoardCell = ({ hasStarPoint }: GoBoardCellProps) => {
  const classes = useStyles({ hasStarPoint });
  return <td className={classes.cell} />;
};

export default GoBoardCell;
