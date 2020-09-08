import * as React from 'react';
import { Ctx } from 'boardgame.io';

import { GameState, Moves } from './types';

type BoardProps = {
  G: GameState;
  ctx: Ctx;
  moves: Moves;
};

const Board: React.FC<BoardProps> = ({ G, ctx, moves }: BoardProps) => {
  return (
    <>
      <div>
        {ctx.gameover ? (
          ctx.gameover.winner !== undefined ? (
            `Winner: ${ctx.gameover.winner}`
          ) : (
            'Draw!'
          )
        ) : (
          <br />
        )}
      </div>
      <table
        style={{
          borderCollapse: 'collapse',
        }}
      >
        <tbody>
          {G.cells.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    border: '1px solid black',
                    margin: 0,
                    padding: 0,
                    textAlign: 'center',
                    lineHeight: '20px',
                    width: '20px',
                    height: '20px',
                  }}
                  onClick={() => moves.clickCell(rowIndex, colIndex)}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Board;
