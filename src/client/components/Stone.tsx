import * as React from 'react';
import { makeStyles } from '@material-ui/core';

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

type Props = {
  player: '0' | '1';
  children?: React.ReactNode;
};

const useStyles = makeStyles(() => ({
  stone: ({ player }: Props) => ({
    alignItems: 'center',
    borderRadius: '100%',
    display: 'flex',
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    lineHeight: 1,

    '&:before': {
      content: '""',
      display: 'inline-block',
      width: 0,
      height: 0,
      paddingBottom: '100%',
    },

    '-webkit-box-shadow': stoneShadow,
    '-moz-box-shadow': stoneShadow,
    'box-shadow': stoneShadow,

    ...(player === '0' && blackStyles),
    ...(player === '1' && whiteStyles),
  }),
}));

const Stone = ({ player, children }: Props) => {
  const classes = useStyles({ player });
  return <div className={classes.stone}>{children}</div>;
};

export default Stone;
