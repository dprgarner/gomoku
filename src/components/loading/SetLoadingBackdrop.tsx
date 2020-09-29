import * as React from 'react';
import LoadingCallbackContext from './LoadingCallbackContext';

const useSetLoadingBackdrop = (delayBeforeOpening: number) => {
  const { setLoadingCount } = React.useContext(LoadingCallbackContext);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingCount((count: number) => count + 1);
    }, delayBeforeOpening);

    return () => {
      clearTimeout(timeout);
      setLoadingCount((count: number) => Math.max(count - 1, 0));
    };
  }, [delayBeforeOpening]);
};

/**
 * If any instances of this component are mounted, a full-page loading backdrop
 * with a spinner appears.
 */
const SetLoadingBackdrop = ({ delayBeforeOpening = 1000 } = {}) => {
  useSetLoadingBackdrop(delayBeforeOpening);
  return null;
};

export default SetLoadingBackdrop;
