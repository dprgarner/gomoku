export interface GameState {
  cells: (string | null)[][];
}

export interface Moves {
  clickCell(rowIndex: number, colIndex: number): void;
}
