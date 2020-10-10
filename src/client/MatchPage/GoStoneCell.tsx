import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Stone from '~/client/components/Stone';

type Props = {
  ghostPlayer: '0' | '1' | null;
  stonePlayer: '0' | '1' | null;
  turnNumber: number | null;
  onClick: () => void;
};

type StyleProps = {
  isInteractive: boolean;
  isVisible: boolean;
};

const useStyles = makeStyles({
  cell: ({ isInteractive, isVisible }: StyleProps) => ({
    lineHeight: 0,
    position: 'relative',
    gridColumn: 'auto / span 2',
    gridRow: 'auto / span 2',
    opacity: isVisible ? 1 : 0,

    '&:hover': {
      opacity: isVisible ? 1 : isInteractive ? 0.5 : 0,
    },

    '&:before': {
      position: 'relative',
      top: 0,
      bottom: 0,
      content: '""',
      display: 'inline-block',
      width: 0,
      height: 0,
      paddingBottom: '100%',
    },
  }),

  parentSize: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const GoStoneCell = ({
  stonePlayer,
  ghostPlayer,
  turnNumber,
  onClick,
}: Props) => {
  const isInteractive = ghostPlayer !== null;
  const isVisible = stonePlayer !== null;
  const player = isVisible ? stonePlayer : ghostPlayer;

  const classes = useStyles({ isInteractive, isVisible });

  return (
    <div
      className={classes.cell}
      onClick={isInteractive ? onClick : undefined}
      role="button"
    >
      <div className={classes.parentSize}>
        {player && <Stone player={player}>{turnNumber}</Stone>}
      </div>
    </div>
  );
};

export default GoStoneCell;
