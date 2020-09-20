import { INVALID_MOVE } from 'boardgame.io/core';
import { Ctx } from 'boardgame.io';

import { GameState, SetupData } from './types';
import range from './range';

function* getRow(size: number, row: number): Generator<[number, number]> {
  for (let column = 0; column < size; column++) {
    yield [row, column];
  }
}

function* getColumn(size: number, column: number): Generator<[number, number]> {
  for (let row = 0; row < size; row++) {
    yield [row, column];
  }
}

function* getDownLeftDiagonal(
  size: number,
  sum: number,
): Generator<[number, number]> {
  for (let row = 0; row < size; row++) {
    const column = sum - row;
    if (column < 0) break;
    if (column < size) yield [row, column];
  }
}

function* getDownRightDiagonal(
  size: number,
  difference: number,
): Generator<[number, number]> {
  for (let row = 0; row < size; row++) {
    const column = row - difference;
    if (column >= size) break;
    if (column >= 0) yield [row, column];
  }
}

function* getLinesToCheck(size: number) {
  for (let row = 0; row < size; row++) {
    yield getRow(size, row);
  }
  for (let column = 0; column < size; column++) {
    yield getColumn(size, column);
  }
  for (let sum = 0; sum < size * 2 - 1; sum++) {
    yield getDownLeftDiagonal(size, sum);
  }
  for (let difference = -size + 1; difference < size; difference++) {
    yield getDownRightDiagonal(size, difference);
  }
}

function isVictory({ size, movesInARow, cells }: GameState, player: string) {
  for (const line of getLinesToCheck(size)) {
    let countersInALine = 0;
    for (const [row, column] of line) {
      if (cells[row][column] === player) {
        countersInALine++;
      } else {
        countersInALine = 0;
      }
      if (countersInALine === movesInARow) {
        return true;
      }
    }
  }
  return false;
}

function isDraw({ size, cells }: GameState) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (cells[i][j] === null) {
        return false;
      }
    }
  }
  return true;
}

const game = {
  setup: (
    _ctx: Ctx,
    { size, movesInARow }: SetupData = { size: 15, movesInARow: 5 },
  ): GameState => {
    const cells: GameState['cells'] = range(size).map(() =>
      range(size).map(() => null),
    );
    const turnNumbers: GameState['turnNumbers'] = range(size).map(() =>
      range(size).map(() => null),
    );

    return { cells, turnNumbers, size, movesInARow };
  },

  turn: {
    moveLimit: 1,
  },

  moves: {
    clickCell: (G: GameState, ctx: Ctx, cellRow: number, cellCol: number) => {
      if (G.cells[cellRow][cellCol] !== null) {
        return INVALID_MOVE;
      }
      G.cells[cellRow][cellCol] = ctx.currentPlayer;
      G.turnNumbers[cellRow][cellCol] = ctx.turn;
    },
  },

  endIf: (G: GameState, ctx: Ctx) => {
    if (isVictory(G, ctx.currentPlayer)) {
      return { winner: ctx.currentPlayer };
    }
    if (isDraw(G)) {
      return { draw: true };
    }
  },
};

export default game;
