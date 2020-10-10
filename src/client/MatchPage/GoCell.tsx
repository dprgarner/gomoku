import * as React from 'react';

import GoStone from './GoBoard/GoStone';

type GoCellProps = {
  ghostPlayer: '0' | '1' | null;
  stonePlayer: '0' | '1' | null;
  turnNumber: number | null;
  onClick: () => void;
};

const GoCell = ({
  stonePlayer,
  ghostPlayer,
  turnNumber,
  onClick,
}: GoCellProps) => {
  const isInteractive = ghostPlayer !== null;
  const isVisible = stonePlayer !== null;
  const player = isVisible ? stonePlayer : ghostPlayer;

  return (
    <GoStone
      element="td"
      isInteractive={isInteractive}
      isVisible={isVisible}
      player={player}
      turnNumber={turnNumber}
      onClick={onClick}
    />
  );
};

export default GoCell;
