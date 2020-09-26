import * as React from 'react';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

import LoadingCallbackContext from './LoadingCallbackContext';

type LoadingBackdropProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'white',
  },
}));

const LoadingBackdrop = ({ children }: LoadingBackdropProps) => {
  const classes = useStyles();
  const [loadingCount, setLoadingCount] = React.useState(0);

  return (
    <LoadingCallbackContext.Provider value={{ setLoadingCount }}>
      <Backdrop className={classes.backdrop} open={!!loadingCount}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </LoadingCallbackContext.Provider>
  );
};

export default LoadingBackdrop;
