import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const starPointSize = 4;

type GoBoardCellProps = {
  hasStarPoint: boolean;
};

type StyleProps = {
  hasStarPoint: boolean;
};

const useStyles = makeStyles({
  cell: ({ hasStarPoint }: StyleProps) => ({
    borderBottom: '1px solid black',
    borderRight: '1px solid black',
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
  return <div className={classes.cell} />;
};

export default GoBoardCell;
