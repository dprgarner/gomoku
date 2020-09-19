import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { squareSize } from './constants';

type StoneCellProps = {
  currentPlayer: string;
  cell: string | null;
  disabled: boolean;
  onClick: () => void;
};

const useStyles = makeStyles({
  cell: {
    border: '1px solid transparent',
    padding: squareSize,
    position: 'relative',
    opacity: 0,
  },

  enabled: {
    '&:hover': {
      opacity: 0.5,
    },
  },

  isPlaced: {
    opacity: 1,

    '&:hover': {
      opacity: 1,
    },
  },

  stone: {
    borderRadius: squareSize,
    bottom: 0,
    left: 0,
    margin: 1,
    position: 'absolute',
    right: 0,
    top: 0,

    '-webkit-box-shadow': '1px 1px 5px 0px rgba(0,0,0,0.75)',
    '-moz-box-shadow': '1px 1px 5px 0px rgba(0,0,0,0.75)',
    'box-shadow': '1px 1px 5px 0px rgba(0,0,0,0.75)',
  },

  whiteStone: {
    border: '1px solid #333',
    background:
      'radial-gradient(circle at top left, rgba(238,238,238,1) 65%, rgba(180,180,180,1) 90%)',
  },

  blackStone: {
    border: '1px solid #333',
    background:
      'radial-gradient(circle at bottom right, rgba(0,0,0,1) 35%, rgba(111,111,111,1) 100%)',
  },
});

const StoneCell = ({
  cell,
  currentPlayer,
  disabled,
  onClick,
}: StoneCellProps) => {
  const classes = useStyles();
  const isPlaced = cell !== null;
  const cellPlayer = isPlaced ? cell : currentPlayer;

  return (
    <td
      className={`
        ${classes.cell}
        ${disabled ? '' : classes.enabled}
        ${isPlaced ? classes.isPlaced : ''}
      `}
      onClick={disabled ? undefined : onClick}
      role="button"
    >
      <div
        className={`
          ${classes.stone}
          ${classes[cellPlayer === '1' ? 'whiteStone' : 'blackStone']}
        `}
      />
    </td>
  );
};

export default StoneCell;
