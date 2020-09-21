import * as React from 'react';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const LoadingCallbackContext = React.createContext({
  setLoadingCount: (_callback: (count: number) => number) => {},
});

type LoadingBackdropProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'white',
  },
}));

export const LoadingBackdrop = ({ children }: LoadingBackdropProps) => {
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

const delayBeforeOpening = 1000;

/**
 * If any components with this hook are mounted, a full-page loading backdrop with a spinner appears.
 */
const useSetLoadingBackdrop = () => {
  const { setLoadingCount } = React.useContext(LoadingCallbackContext);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingCount((count: number) => count + 1);
    }, delayBeforeOpening);

    return () => {
      clearTimeout(timeout);
      setLoadingCount((count: number) => Math.max(count - 1, 0));
    };
  }, []);
};

export const SetLoadingBackdrop = () => {
  useSetLoadingBackdrop();
  return null;
};
