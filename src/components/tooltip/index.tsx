import * as React from 'react';
import styles from './styles.css';

interface TooltipProps {
  text: string;
  left: string;
  marginTop: string;
}

export const Tooltip = ({ text, left, marginTop }: TooltipProps) => {
  return (
    <div style={{ left, marginTop }} className={styles.container}>
      <span className={styles.text}>{text}</span>
    </div>
  );
};
