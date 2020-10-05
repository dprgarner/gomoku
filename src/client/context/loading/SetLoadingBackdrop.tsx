import * as React from 'react';

import LoadingCallbackContext from './LoadingCallbackContext';

type SetLoadingBackdropProps = {
  delayBeforeOpening?: number;
};

const useSetLoadingBackdrop = (delayBeforeOpening: number) => {
  const setLoadingCount = React.useContext(LoadingCallbackContext);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingCount((count: number) => count + 1);
    }, delayBeforeOpening);

    return () => {
      clearTimeout(timeout);
      setLoadingCount((count: number) => Math.max(count - 1, 0));
    };
  }, [setLoadingCount, delayBeforeOpening]);
};

/**
 * A component for setting the loading backdrop. This component doesn't render
 * anything, but triggers a callback when mounting and unmounting. The provider
 * component LoadingBackdrop listens to this callback and renders a loading
 * backdrop if any SetLoadingBackdrop components are rendered on the page.
 *
 */
const SetLoadingBackdrop: React.FC<SetLoadingBackdropProps> = ({
  delayBeforeOpening = 1000,
}) => {
  useSetLoadingBackdrop(delayBeforeOpening);
  return null;
};

export default SetLoadingBackdrop;
