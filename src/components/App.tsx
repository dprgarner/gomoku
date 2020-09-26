import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom';

import game from '~/game';

import Board from './Board';
import Layout from './Layout';
import ThemeProvider from './ThemeProvider';
import SetLoadingBackdrop from './loading/SetLoadingBackdrop';
import LoadingBackdrop from './loading/LoadingBackdrop';

const server =
  process.env.NODE_ENV === 'development' ? '//localhost:8000' : undefined;

// Typing is still broken for Client.board as of v0.40. :(
const GomokuClient = (Client as any)({
  game,
  board: Board,
  multiplayer: SocketIO({
    server,
  }),
  debug: false,
  // For a smoother animation effect and a less jarring transition, the loading
  // backdrop is split into two components. The SetLoadingBackdrop component
  // triggers the loading effect via context; the LoadingBackdrop component
  // listens and renders the backdrop.
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

const Lobby = () => null;

const App = () => {
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
              <Lobby />
            </Route>
          </Switch>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
