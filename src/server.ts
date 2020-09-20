import { Server } from 'boardgame.io/server';
import game from './game';

const server = Server({ games: [game] });
server.run(8000);
