import { Positions, Scenarios } from '../types';

export function calculatorPosition(index: number, col: number) {
  return {
    posx: index % col,
    posy: Math.floor(index / col)
  };
}

export function checkHighlighted(positions: Positions[], pos: Positions) {
  return (
    positions &&
    !!positions.find(({ posx, posy }) => posx === pos.posx && posy === pos.posy)
  );
}

export function getHighlightedTiles({
  highlightedTiles: numOfTiles,
  grid
}: Scenarios) {
  const [row, col] = grid.split('*').map((n) => +n || 0);
  const highlightedTiles: Positions[] = [];
  while (true) {
    if (highlightedTiles.length === Math.min(numOfTiles, row * col)) {
      break;
    }
    const posx = Math.floor(Math.random() * col);
    const posy = Math.floor(Math.random() * row);
    const isExists = highlightedTiles.find(
      (obj) => obj?.posx === posx && obj?.posy === posy
    );
    if (!isExists) {
      highlightedTiles.push({ posx, posy });
    }
  }
  return highlightedTiles;
}
