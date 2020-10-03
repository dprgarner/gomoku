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
import GomokuClientContainer from './GomokuClientContainer';
import { useFirebaseUser } from './firebase';

import SetLoadingBackdrop from './loading/SetLoadingBackdrop';
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
  const { user, isLoading } = useFirebaseUser();
  const location = useLocation();

  if (isLoading) return <SetLoadingBackdrop />;
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

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CssBaseline />
        <LoadingBackdrop>
          <Layout>
            <Switch>
              <Route path="/match/:matchID/player/:playerID">
                <GetUser>{() => <GomokuClientContainer />}</GetUser>
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/" exact>
                <LobbyPage />
              </Route>
            </Switch>
          </Layout>
        </LoadingBackdrop>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
