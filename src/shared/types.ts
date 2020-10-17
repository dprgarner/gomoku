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
  [uid: string]:
    | {
        displayName?: string;
        photoURL?: string;
      }
    | undefined;
};

export type SerializedLobbyMatch = {
  players: [
    {
      id: '0';
      data?: {
        uid: string;
      };
    },
    {
      id: '1';
      data?: {
        uid: string;
      };
    },
  ];
  setupData: SetupData;
  createdAt: number;
  updatedAt: number;
  matchID: string;
};
