import * as React from 'react';

type LoadingCallback = React.Dispatch<React.SetStateAction<number>>;

const LoadingCallbackContext = React.createContext<LoadingCallback>(() => {
  /* No-op. This should be set in provider. */
});

export default LoadingCallbackContext;
