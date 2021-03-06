import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AddLoginMethodPage from './AddLoginMethodPage';
import Layout from './components/Layout';
import LobbyPage from './LobbyPage';
import LoginPage from './LoginPage';
import MatchPage from './MatchPage';
import useEncodedLocation from './context/useEncodedLocation';
import withGomokuClient from './withGomokuClient';
import { useProfile } from './context/firebaseUser';
import Providers from './context/Providers';
import UserMenu from './UserMenu';
import ProfilePage from './ProfilePage';
import BackgroundImage from './components/BackgroundImage';

type CheckLoggedInProps = {
  children: React.ReactElement;
};

const CheckLoggedIn = ({ children }: CheckLoggedInProps) => {
  const user = useProfile();
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
      <Layout userMenu={<UserMenu />}>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/add-login-method">
            <CheckLoggedIn>
              <AddLoginMethodPage />
            </CheckLoggedIn>
          </Route>

          <Route path="/match/:matchID">
            {({ match }: MatchPlayerParams) =>
              match && (
                <CheckLoggedIn>
                  <BackgroundImage image="multipleRocks">
                    <MatchPageWithClient matchID={match.params.matchID} />
                  </BackgroundImage>
                </CheckLoggedIn>
              )
            }
          </Route>

          <Route path="/profile">
            <CheckLoggedIn>
              <ProfilePage />
            </CheckLoggedIn>
          </Route>

          <Route path="/" exact>
            <CheckLoggedIn>
              <BackgroundImage image="singleRock">
                <LobbyPage />
              </BackgroundImage>
            </CheckLoggedIn>
          </Route>
        </Switch>
      </Layout>
    </Providers>
  );
};

export default App;
