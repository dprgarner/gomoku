import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import AddLoginMethodPage from './AddLoginMethodPage';
import Layout from './Layout';
import LoadingBackdrop from './loading/LoadingBackdrop';
import LobbyPage from './LobbyPage';
import LoginPage from './LoginPage';
import MatchPage from './MatchPage';
import ThemeProvider from './ThemeProvider';
import useEncodedLocation from './useEncodedLocation';
import withGomokuClient from './withGomokuClient';
import { FirebaseUserProvider, useFirebaseUser } from './firebaseUser';

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

type CheckLoggedInProps = {
  children: React.ReactElement;
};

const CheckLoggedIn = ({ children }: CheckLoggedInProps) => {
  const user = useFirebaseUser();
  const redirectPath = useEncodedLocation();

  if (!user) {
    return <Redirect to={`/login?redirect=${redirectPath}`} />;
  }

  return children;
};

type MatchPlayerParams = {
  match: {
    params: {
      matchID: string;
      playerID: string;
    };
  } | null;
};

const MatchPageWithClient = withGomokuClient(MatchPage);

const App = () => {
  return (
    <Providers>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/add-login-method">
            <CheckLoggedIn>
              <AddLoginMethodPage />
            </CheckLoggedIn>
          </Route>

          <Route path="/match/:matchID/player/:playerID">
            {({ match }: MatchPlayerParams) =>
              match && (
                <CheckLoggedIn>
                  <MatchPageWithClient
                    matchID={match.params.matchID}
                    playerID={match.params.playerID}
                  />
                </CheckLoggedIn>
              )
            }
          </Route>

          <Route path="/" exact>
            <CheckLoggedIn>
              <LobbyPage />
            </CheckLoggedIn>
          </Route>
        </Switch>
      </Layout>
    </Providers>
  );
};

export default App;
