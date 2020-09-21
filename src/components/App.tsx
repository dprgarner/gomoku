import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  useParams,
} from 'react-router-dom';

import game from '~/game';

import Board from './Board';
import Layout from './Layout';
import ThemeProvider from './ThemeProvider';
import { SetLoadingBackdrop, LoadingBackdrop } from './loadingBackdrop';

// Typing is still broken for Client.board as of v0.40. :(
const GomokuClient = (Client as any)({
  game,
  board: Board,
  multiplayer: SocketIO({
    server:
      process.env.NODE_ENV === 'development' ? 'localhost:8000' : undefined,
  }),
  debug: false,
  // For a smoother animation effect and a less jarring transition, the loading
  // backdrop is split into two components. The SetLoadingBackdrop component
  // triggers the loading effect via context; the LoadingBackdrop component
  // listens.
  loading: SetLoadingBackdrop,
});

const RoutedGomokuClient = () => {
  const { matchID, playerID } = useParams<{
    matchID: string;
    playerID: string;
  }>();

  return (
    <LoadingBackdrop>
      <GomokuClient playerID={playerID} matchID={matchID} />
    </LoadingBackdrop>
  );
};

const choose = (n: number) => Math.floor(Math.random() * n);

const App = () => {
  const randomGame = choose(100);
  const randomPlayer = choose(2);
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CssBaseline />
        <Layout>
          <Switch>
            <Route path="/match/:matchID/player/:playerID">
              <RoutedGomokuClient />
            </Route>
            <Route>
              <Redirect to={`/match/${randomGame}/player/${randomPlayer}`} />
            </Route>
          </Switch>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
