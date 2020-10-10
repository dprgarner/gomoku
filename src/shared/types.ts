export type SetupData = {
  size: number;
  movesInARow: number;
};

export type GameState = {
  size: number;
  movesInARow: number;
  cells: ('0' | '1' | null)[][];
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
