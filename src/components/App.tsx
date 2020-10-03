import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { createPath } from 'history';

import Layout from './Layout';
import ThemeProvider from './ThemeProvider';
import LoadingBackdrop from './loading/LoadingBackdrop';
import GomokuClient from './GomokuClient';
import { FirebaseUserProvider, useFirebaseUser } from './firebaseUser';
import LoginPage from './LoginPage';
import LobbyPage from './LobbyPage';

const Providers: React.FC = ({ children }) => (
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
  const location = useLocation();

  if (!user) {
    const redirectPath = createPath(location);
    return (
      <Redirect to={`/login?redirect=${encodeURIComponent(redirectPath)}`} />
    );
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

const App = () => {
  return (
    <Providers>
      <CssBaseline />
      <Layout>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/match/:matchID/player/:playerID">
            {({ match }: MatchPlayerParams) =>
              match && (
                <CheckLoggedIn>
                  <GomokuClient
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
