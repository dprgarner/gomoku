import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Client } from 'boardgame.io/react';

import game from '~/game';

import Board from './Board';
import Layout from './Layout';
import ThemeProvider from './ThemeProvider';

// Typing is still broken for Client.board as of v0.40. :(
const GomokuClient = (Client as any)({
  game,
  board: Board,
  debug: false,
});

const App = () => (
  <ThemeProvider>
    <CssBaseline />
    <Layout>
      <GomokuClient />
    </Layout>
  </ThemeProvider>
);

export default App;
