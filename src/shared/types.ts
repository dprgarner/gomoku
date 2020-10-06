export type SetupData = {
  size: number;
  movesInARow: number;
};

export type GameState = {
  size: number;
  movesInARow: number;
  cells: (string | null)[][];
  turnNumbers: (number | null)[][];
};

export type Moves = {
  clickCell(rowIndex: number, colIndex: number): void;
};

export type SerializedUsers = {
  [uid: string]: {
    displayName?: string;
    photoURL?: string;
  };
};
