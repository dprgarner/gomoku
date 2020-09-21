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

// Typing is still broken for Client.board as of v0.40. :(
const GomokuClient = (Client as any)({
  game,
  board: Board,
  multiplayer: SocketIO({
    server:
      process.env.NODE_ENV === 'development' ? 'localhost:8000' : undefined,
  }),
  debug: false,
});

const RoutedGomokuClient = () => {
  const { matchID, playerID } = useParams<{
    matchID: string;
    playerID: string;
  }>();
  return <GomokuClient playerID={playerID} matchID={matchID} />;
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
