import { INVALID_MOVE } from 'boardgame.io/core';

const SIZE = 15;
const MOVES_IN_A_ROW = 5;

function* getRow(row) {
  for (let column = 0; column < SIZE; column++) {
    yield [row, column];
  }
}

function* getColumn(column) {
  for (let row = 0; row < SIZE; row++) {
    yield [row, column];
  }
}

function* getDownLeftDiagonal(sum) {
  for (let row = 0; row < SIZE; row++) {
    const column = sum - row;
    if (column < 0) break;
    if (column < SIZE) yield [row, column];
  }
}

function* getDownRightDiagonal(difference) {
  for (let row = 0; row < SIZE; row++) {
    const column = row - difference;
    if (column >= SIZE) break;
    if (column >= 0) yield [row, column];
  }
}

function* getLinesToCheck() {
  for (let row = 0; row < SIZE; row++) {
    yield getRow(row);
  }
  for (let column = 0; column < SIZE; column++) {
    yield getColumn(column);
  }
  for (let sum = 0; sum < SIZE * 2 - 1; sum++) {
    yield getDownLeftDiagonal(sum);
  }
  for (let difference = -SIZE + 1; difference < SIZE; difference++) {
    yield getDownRightDiagonal(difference);
  }
}

function isVictory(cells, player) {
  for (const line of getLinesToCheck()) {
    let countersInALine = 0;
    for (const [row, column] of line) {
      if (cells[row][column] === player) {
        countersInALine++;
      } else {
        countersInALine = 0;
      }
      if (countersInALine === MOVES_IN_A_ROW) {
        return true;
      }
    }
  }
  return false;
}

function isDraw(cells) {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (cells[i][j] === null) {
        return false;
      }
    }
  }
  return true;
}

export const Gomoku = {
  setup: () => {
    const cells = [];
    for (let i = 0; i < SIZE; i++) {
      cells.push(Array(SIZE).fill(null));
    }
    return { cells };
  },

  turn: {
    moveLimit: 1,
  },

  moves: {
    clickCell: (G, ctx, cellRow, cellCol) => {
      if (G.cells[cellRow][cellCol] !== null) {
        return INVALID_MOVE;
      }
      G.cells[cellRow][cellCol] = ctx.currentPlayer;
    },
  },

  endIf: (G, ctx) => {
    if (isVictory(G.cells, ctx.currentPlayer)) {
      return { winner: ctx.currentPlayer };
    }
    if (isDraw(G.cells)) {
      return { draw: true };
    }
  },
};
