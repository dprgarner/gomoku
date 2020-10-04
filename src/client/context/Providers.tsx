import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import LoadingBackdrop from './loading/LoadingBackdrop';
import ThemeProvider from './ThemeProvider';
import { FirebaseUserProvider } from './firebaseUser';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => (
  <FirebaseUserProvider>
    <BrowserRouter>
      <ThemeProvider>
        <CssBaseline />
        <LoadingBackdrop>{children}</LoadingBackdrop>
      </ThemeProvider>
    </BrowserRouter>
  </FirebaseUserProvider>
);

export default Providers;
