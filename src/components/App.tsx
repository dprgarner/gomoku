import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

import game from '~/game';

import Board from './Board';
import Layout from './Layout';
import ThemeProvider from './ThemeProvider';

// Typing is still broken for Client.board as of v0.40. :(
const GomokuClient = (Client as any)({
  game,
  board: Board,
  // TODO inject via env variables
  multiplayer: SocketIO({ server: 'localhost:8000' }),
  debug: false,
});

const App = () => {
  // TODO Add React-Router
  const playerID = window.location.search.includes('playerID=1') ? '1' : '0';

  return (
    <ThemeProvider>
      <CssBaseline />
      <Layout>
        <GomokuClient playerID={playerID} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
