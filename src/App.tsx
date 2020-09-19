import * as React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Client } from 'boardgame.io/react';

import Board from './Board';
import game from './game';
import Layout from './Layout';
import theme from './theme';

// Typing is still broken for Client.board as of v0.40. :(
const GomokuClient = (Client as any)({
  game: game,
  board: Board,
  debug: false,
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <Layout>
      <GomokuClient />
    </Layout>
  </ThemeProvider>
);

export default App;
