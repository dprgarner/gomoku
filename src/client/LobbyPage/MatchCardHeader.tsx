import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PlayButton from './PlayButton';
import Stone from '../components/Stone';
import NamedAvatar from './NamedAvatar';

type StyleProps = {
  hasBlack: boolean;
  hasWhite: boolean;
};

const playerColumn = {
  flex: '1 1 50%',
  display: 'flex',
  flexFlow: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
};

const stone = {
  display: 'inline-block',
  margin: '0 auto',
  width: 60,
};

const useStyles = makeStyles((theme) => ({
  stoneContainer: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },

  blackStone: ({ hasBlack }: StyleProps) => ({
    ...stone,
    opacity: hasBlack ? 1 : 0.5,
  }),

  whiteStone: ({ hasWhite }: StyleProps) => ({
    ...stone,
    opacity: hasWhite ? 1 : 0.33,
  }),

  players: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },

  blackColumn: {
    ...playerColumn,
    // ¯\_(ツ)_/¯ No idea why TypeScript needs this.
    flexWrap: 'nowrap',
  },

  whiteColumn: {
    ...playerColumn,
    flexWrap: 'nowrap',
    flexDirection: 'row-reverse',
  },
}));

export type MatchCardHeaderProps = {
  matchID: string;
  players: [
    {
      data?: {
        displayName?: string;
        photoURL?: string;
      };
    },
    {
      data?: {
        displayName?: string;
        photoURL?: string;
      };
    },
  ];
};

const MatchCardHeader = ({ matchID, players }: MatchCardHeaderProps) => {
  const [black, white] = players;
  const hasWhite = !!white.data;
  const hasBlack = !!black.data;
  const classes = useStyles({ hasWhite, hasBlack });

  return (
    <>
      <div className={classes.stoneContainer}>
        <div className={classes.blackStone}>
          <Stone player="0" />
        </div>

        <div className={classes.whiteStone}>
          <Stone player="1" />
        </div>
      </div>

      <div className={classes.players}>
        <div className={classes.blackColumn}>
          {black.data ? (
            <NamedAvatar {...black.data} />
          ) : (
            <PlayButton displayName={white.data?.displayName} />
          )}
        </div>

        <div className={classes.whiteColumn}>
          {white.data ? (
            <NamedAvatar {...white.data} />
          ) : (
            <PlayButton displayName={black.data?.displayName} />
          )}
        </div>
      </div>
    </>
  );
};

export default MatchCardHeader;
