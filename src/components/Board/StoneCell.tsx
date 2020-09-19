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
  stoneCell: {
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

  stonePlaced: {
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
  },

  whiteStone: {
    border: '1px solid #333',
    background:
      'linear-gradient(135deg, rgba(238,238,238,1) 25%, rgba(238,238,238,1) 65%, rgba(204,204,204,1) 100%);',
  },

  blackStone: {
    border: '1px solid #333',
    background:
      'linear-gradient(315deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(111,111,111,1) 100%);',
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
        ${disabled ? '' : classes.enabled}
        ${classes.stoneCell}
        ${isPlaced ? classes.stonePlaced : ''}
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
