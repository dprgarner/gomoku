import * as React from 'react';

const LoadingCallbackContext = React.createContext({
  setLoadingCount: (_callback: (count: number) => number) => {},
});

export default LoadingCallbackContext;
