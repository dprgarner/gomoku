import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { squareSize, stoneFontSize, stoneLineHeight } from './constants';

type GoStoneProps = {
  element: keyof JSX.IntrinsicElements;
  isInteractive: boolean;
  isVisible: boolean;
  player: '0' | '1' | null;
  turnNumber: number | null;
  onClick?: () => void;
};

type StyleProps = Pick<GoStoneProps, 'player' | 'isInteractive' | 'isVisible'>;

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
  cell: ({ isInteractive, isVisible }: StyleProps) => ({
    border: '1px solid transparent',
    padding: squareSize,
    position: 'relative',
    opacity: isVisible ? 1 : 0,

    '&:hover': {
      opacity: isVisible ? 1 : isInteractive ? 0.5 : 0,
    },
  }),

  stone: ({ player }: StyleProps) => ({
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

    ...(player === '0' && blackStyles),
    ...(player === '1' && whiteStyles),
  }),
});

const GoStone = ({
  element: Tag,
  isInteractive,
  isVisible,
  player,
  turnNumber,
  onClick,
}: GoStoneProps) => {
  const classes = useStyles({ isInteractive, isVisible, player });
  return (
    <Tag
      className={classes.cell}
      onClick={isInteractive ? onClick : undefined}
      role="button"
    >
      <div className={classes.stone}>{turnNumber}</div>
    </Tag>
  );
};

export default GoStone;
