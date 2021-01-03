import * as React from 'react';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';

import multipleRocks from 'data-url:./multiple-rocks.svg';
import singleRock from 'data-url:./single-rock.svg';

const backgroundRocks = {
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  content: '""',
  height: '100%',
  opacity: 0.7,
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: -1,
};

const useStyles = makeStyles({
  multipleRocks: {
    '&:before': {
      ...backgroundRocks,
      backgroundImage: `url(${multipleRocks})`,
      backgroundPosition: 'bottom left',
      bottom: 0,
      left: 0,
      width: '20vw',
    },
  },

  singleRock: {
    '&:after': {
      ...backgroundRocks,
      backgroundImage: `url(${singleRock})`,
      backgroundPosition: 'top right',
      backgroundRepeat: 'no-repeat',
      right: '-75px',
      top: '300px',
      width: '250px',
    },
  },
});

type Props = {
  image: 'singleRock' | 'multipleRocks';
  children: React.ReactNode;
};

const BackgroundImage = ({ image, children }: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const showImage = useMediaQuery(theme.breakpoints.up('md'));

  return <div className={showImage ? classes[image] : ''}>{children}</div>;
};

export default BackgroundImage;
