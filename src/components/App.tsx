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
import FakeLobby from './Lobby';

type UserProps = {
  children: (user: firebase.User) => React.ReactElement;
};

/**
 * A function-as-child component for rendering the child component with the user
 * when logged-in.
 * Not a hook because the child should only be rendered when there is a user.
 */
const GetUser = ({ children }: UserProps) => {
  const user = useFirebaseUser();
  const location = useLocation();

  if (!user) {
    const redirectPath = createPath(location);
    return (
      <Redirect to={`/login?redirect=${encodeURIComponent(redirectPath)}`} />
    );
  }
  return children(user);
};

const LobbyPage = () => (
  <GetUser>
    {(user) => (
      <>
        {`Welcome, ${user.displayName || 'friend'}`}
        <FakeLobby />
      </>
    )}
  </GetUser>
);

type MatchPlayerParams = {
  match: {
    params: {
      matchID: string;
      playerID: string;
    };
  } | null;
};

const Providers: React.FC = ({ children }) => (
  <FirebaseUserProvider>
    <BrowserRouter>
      <ThemeProvider>
        <LoadingBackdrop>{children}</LoadingBackdrop>
      </ThemeProvider>
    </BrowserRouter>
  </FirebaseUserProvider>
);

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
                <GetUser>
                  {() => (
                    <GomokuClient
                      matchID={match.params.matchID}
                      playerID={match.params.playerID}
                    />
                  )}
                </GetUser>
              )
            }
          </Route>

          <Route path="/" exact>
            <LobbyPage />
          </Route>
        </Switch>
      </Layout>
    </Providers>
  );
};

export default App;
