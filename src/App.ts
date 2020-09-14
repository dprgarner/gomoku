import { Client } from 'boardgame.io/react';
import { Gomoku } from './Game';
import Board from './Board';

// Typing is still broken for Client.board as of v0.40. :(
const App = (Client as any)({
  game: Gomoku,
  board: Board,
});

export default App;
