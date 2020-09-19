import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Client } from 'boardgame.io/react';
import { ThemeProvider } from '@material-ui/core';

import game from '~/game';

import theme from './theme';
import Board from './Board';
import Layout from './Layout';

// Typing is still broken for Client.board as of v0.40. :(
const GomokuClient = (Client as any)({
  game,
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
