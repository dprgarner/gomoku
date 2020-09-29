import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Layout from './Layout';
import ThemeProvider from './ThemeProvider';
import LoadingBackdrop from './loading/LoadingBackdrop';
import GomokuClientContainer from './GomokuClientContainer';
import { useFirebaseUser, Login } from './firebase';

import SetLoadingBackdrop from './loading/SetLoadingBackdrop';

const Lobby = () => {
  const { user, isLoading } = useFirebaseUser();
  if (isLoading) return <SetLoadingBackdrop />;
  if (!user) return <Redirect to="/login" />;
  return <>{`Welcome, ${user.displayName || 'friend'}`}</>;
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CssBaseline />
        <LoadingBackdrop>
          <Layout>
            <Switch>
              <Route path="/match/:matchID/player/:playerID">
                <GomokuClientContainer />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route>
                <Lobby />
              </Route>
            </Switch>
          </Layout>
        </LoadingBackdrop>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
