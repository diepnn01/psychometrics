import * as React from 'react';
import { Styles } from './styles';
import { BG_HIGHLIGHTED, BG_HIGHLIGHTER } from '../../constants/tiles';

interface TitlesProps {
  width: number;
  height: number;
  margin: number;
  onClick: () => void;
  isHighlighted: boolean;
  disable: boolean;
  keepHighlighted: boolean;
}

export const Tiles = ({
  height,
  width,
  margin,
  onClick,
  isHighlighted,
  disable,
  keepHighlighted
}: TitlesProps) => {
  return (
    <div
      role='button'
      {...{ onClick }}
      key={new Date().toISOString() + Math.random()}
      style={{
        ...Styles.container,
        width,
        height,
        margin,
        pointerEvents: disable ? 'none' : 'all',
        background: keepHighlighted ? BG_HIGHLIGHTER : BG_HIGHLIGHTED,
        animation: 'anim-highlighted',
        animationDuration: '0.16s',
        animationDirection: 'alternate',
        animationPlayState: 'running',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: isHighlighted ? 'infinite' : 0
      }}
    />
  );
};
