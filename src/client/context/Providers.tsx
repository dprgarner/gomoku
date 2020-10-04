import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

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
        <LoadingBackdrop>{children}</LoadingBackdrop>
      </ThemeProvider>
    </BrowserRouter>
  </FirebaseUserProvider>
);

export default Providers;
