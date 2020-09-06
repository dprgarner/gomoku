import { Client } from 'boardgame.io/react';
import { Gomoku } from './Game';
import Board from './Board';

const App = Client({
  game: Gomoku,
  board: Board,
});

export default App;
