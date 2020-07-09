/// <reference types="react" />
import { Scenarios as ScenariosType, Positions, Instructions, Status } from '../../types';
interface ScenariosProps {
    onPressTiles?: (positions: Positions) => void;
    scenario: ScenariosType;
    highlightedTiles: Positions[];
    positionsSelected: Positions[];
    instructions: Instructions;
    status: Status;
}
export declare const Scenarios: ({ scenario: { grid }, onPressTiles, instructions, highlightedTiles, status, positionsSelected }: ScenariosProps) => JSX.Element;
export {};
