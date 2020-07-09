/// <reference types="react" />
interface TitlesProps {
    width: number;
    height: number;
    margin: number;
    onClick: () => void;
    isHighlighted: boolean;
    disable: boolean;
    keepHighlighted: boolean;
}
export declare const Tiles: ({ height, width, margin, onClick, isHighlighted, disable, keepHighlighted }: TitlesProps) => JSX.Element;
export {};
