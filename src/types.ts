export interface GameState {
  cells: (string | null)[][];
  turnNumbers: (number | null)[][];

  // TODO SIZE and IN_A_ROW should live here.
}

export interface Moves {
  clickCell(rowIndex: number, colIndex: number): void;
}
