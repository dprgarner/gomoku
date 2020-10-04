import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  squareSize,
  stoneFontSize,
  stoneLineHeight,
} from './GoBoard/constants';

type StoneCellProps = {
  ghostPlayer: string | null;
  stonePlayer: string | null;
  turnNumber: number | null;
  onClick: () => void;
};

type StyleProps = {
  isEnabled: boolean;
  hasStone: boolean;
  cellPlayer: string | null;
};

const stoneShadow = '3px 3px 5px 0px rgba(0,0,0,0.6)';

const blackStyles = {
  background:
    'radial-gradient(circle at bottom right, rgba(0,0,0,1) 35%, rgba(111,111,111,1) 100%)',
  color: '#ddd',
};

const whiteStyles = {
  background:
    'radial-gradient(circle at top left, rgba(238,238,238,1) 65%, rgba(180,180,180,1) 90%)',
  color: '#333',
};

const useStyles = makeStyles({
  cell: ({ isEnabled, hasStone }: StyleProps) => ({
    border: '1px solid transparent',
    padding: squareSize,
    position: 'relative',
    opacity: hasStone ? 1 : 0,

    '&:hover': {
      opacity: hasStone ? 1 : isEnabled ? 0.5 : 0,
    },
  }),

  stone: ({ cellPlayer }: StyleProps) => ({
    borderRadius: squareSize,
    bottom: 0,
    left: 0,
    margin: 1,
    position: 'absolute',
    right: 0,
    top: 0,

    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
    fontSize: stoneFontSize,
    fontWeight: 'bold',
    lineHeight: `${stoneLineHeight}px`,

    '-webkit-box-shadow': stoneShadow,
    '-moz-box-shadow': stoneShadow,
    'box-shadow': stoneShadow,

    ...(cellPlayer === '0' && blackStyles),
    ...(cellPlayer === '1' && whiteStyles),
  }),
});

const GoStone = ({
  stonePlayer,
  ghostPlayer,
  turnNumber,
  onClick,
}: StoneCellProps) => {
  const isEnabled = ghostPlayer !== null;
  const hasStone = stonePlayer !== null;
  const cellPlayer = hasStone ? stonePlayer : ghostPlayer;

  const classes = useStyles({ isEnabled, hasStone, cellPlayer });

  return (
    <td
      className={classes.cell}
      onClick={isEnabled ? onClick : undefined}
      role="button"
    >
      <div className={classes.stone}>{turnNumber}</div>
    </td>
  );
};

export default GoStone;
