import { Positions, Scenarios } from '../types';
export declare function calculatorPosition(index: number, col: number): {
    posx: number;
    posy: number;
};
export declare function checkHighlighted(positions: Positions[], pos: Positions): boolean;
export declare function getHighlightedTiles({ highlightedTiles: numOfTiles, grid }: Scenarios): Positions[];
