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

const stoneShadow = '3px 3px 5px 0px rgba(0,0,0,0.6)';

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

  isStonePlaced: {
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

    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
    fontSize: stoneFontSize,
    fontWeight: 'bold',
    lineHeight: `${stoneLineHeight}px`,

    '-webkit-box-shadow': stoneShadow,
    '-moz-box-shadow': stoneShadow,
    'box-shadow': stoneShadow,
  },

  white: {
    background:
      'radial-gradient(circle at top left, rgba(238,238,238,1) 65%, rgba(180,180,180,1) 90%)',
    color: '#333',
  },

  black: {
    background:
      'radial-gradient(circle at bottom right, rgba(0,0,0,1) 35%, rgba(111,111,111,1) 100%)',
    color: '#ddd',
  },
});

const GoStone = ({
  stonePlayer,
  ghostPlayer,
  turnNumber,
  onClick,
}: StoneCellProps) => {
  const classes = useStyles();
  const enabled = ghostPlayer !== null;
  const isStonePlaced = stonePlayer !== null;
  const cellPlayer = isStonePlaced ? stonePlayer : ghostPlayer;

  return (
    <td
      className={`
        ${classes.cell}
        ${enabled ? classes.enabled : ''}
        ${isStonePlaced ? classes.isStonePlaced : ''}
      `}
      onClick={enabled ? onClick : undefined}
      role="button"
    >
      <div
        className={`
          ${classes.stone}
          ${classes[cellPlayer === '1' ? 'white' : 'black']}
        `}
      >
        {turnNumber}
      </div>
    </td>
  );
};

export default GoStone;
