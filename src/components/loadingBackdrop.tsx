import * as React from 'react';
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';

const LoadingCallbackContext = React.createContext({
  setIsLoading: (_isLoading: boolean) => {},
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
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <LoadingCallbackContext.Provider value={{ setIsLoading }}>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </LoadingCallbackContext.Provider>
  );
};

const delayBeforeOpening = 1000;

export const SetLoadingBackdrop = () => {
  const { setIsLoading } = React.useContext(LoadingCallbackContext);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(true);
    }, delayBeforeOpening);

    return () => {
      clearTimeout(timeout);
      setIsLoading(false);
    };
  }, []);

  return null;
};
