import React from 'react';
import { Tiles } from '../tiles';
import {
  Scenarios as ScenariosType,
  Positions,
  Instructions,
  Status
} from '../../types';
import { TILES_HEIGHT, TILES_WIDTH, TILES_SPACE } from '../../constants/tiles';
import { Styles } from './styles';
import { Tooltip } from '../tooltip';
import { calculatorPosition, checkHighlighted } from '../../utils';

interface ScenariosProps {
  onPressTiles?: (positions: Positions) => void;
  scenario: ScenariosType;
  highlightedTiles: Positions[];
  positionsSelected: Positions[];
  instructions: Instructions;
  status: Status;
}

export const Scenarios = ({
  scenario: { grid },
  onPressTiles,
  instructions,
  highlightedTiles,
  status,
  positionsSelected
}: ScenariosProps) => {
  const [row, col] = grid?.split('*').map((n) => +n || 0);

  const handleOnClick = React.useCallback(
    (position: Positions) => {
      return () => onPressTiles?.(position);
    },
    [onPressTiles]
  );

  function renderTiles(_: any, index: number) {
    const position = calculatorPosition(index, col);
    return (
      <Tiles
        width={TILES_WIDTH}
        height={TILES_HEIGHT}
        margin={TILES_SPACE / 2}
        key={`tiles-${index}`}
        onClick={handleOnClick(position)}
        disable={!status.isPause}
        keepHighlighted={checkHighlighted(positionsSelected, position)}
        isHighlighted={
          !status.isPause && checkHighlighted(highlightedTiles, position)
        }
      />
    );
  }
  const width = col * TILES_WIDTH + TILES_SPACE * col;
  const height = row * TILES_HEIGHT + TILES_SPACE * col;
  return (
    <div
      style={{
        ...Styles.grid,
        width,
        height
      }}
    >
      {status.showGrid &&
        Array.apply(null, new Array(row * col)).map(renderTiles)}
      <Tooltip
        marginTop={`${height + 16}px`}
        left='calc(50% - 88px)'
        text={status.isPre ? instructions?.pre : instructions?.post}
      />
    </div>
  );
};
