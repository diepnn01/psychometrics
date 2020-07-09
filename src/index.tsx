import React, { useState, useMemo, useEffect } from 'react';
import styles from './styles.module.css';
import { Scenarios } from './components';
import { Configuration, Positions, Status, ResponseScenarios } from './types';
import { getHighlightedTiles, checkHighlighted } from './utils';
import { BG_HIGHLIGHTED, BG_HIGHLIGHTER } from './constants/tiles';

const styleSheet = document.styleSheets[0];
const styleKeyFrames = `
    @keyframes anim-highlighted {
      0%   {background-color:${BG_HIGHLIGHTED};}
      100% {background-color:${BG_HIGHLIGHTER};}
    }
  `;
styleSheet.insertRule(styleKeyFrames, styleSheet.cssRules.length);

let idInterval: NodeJS.Timeout;
let idTimeOut: NodeJS.Timeout;

export interface PsychometricsProps {
  configuration: Configuration;
}

const initStatus = {
  isPause: false,
  isPost: false,
  isPre: true,
  showGrid: false
};

export const Psychometrics = ({
  configuration: { instructions, scenarios }
}: PsychometricsProps) => {
  const [screen, setScreen] = useState(0);
  const scenario = scenarios[screen];
  const [displayTime, setDisplayTime] = useState(0);
  const [status, setStatus] = useState<Status>(initStatus);
  const [positionsSelected, setPositionSelected] = useState<Positions[]>([]);
  const res = useMemo<ResponseScenarios>(
    () => ({
      highlightedTiles: getHighlightedTiles(scenario),
      userResponse: []
    }),
    [scenario, screen]
  );
  const { highlightedTiles, userResponse } = res;

  function handleNextScreen() {
    console.log(`Screen ${scenario.grid} response:`, {
      scenario: { highlightedTiles, userResponse }
    });
    const max = scenarios.length - 1;
    const index = Math.min(screen + 1, max);
    clearInterval(idInterval);
    if (index !== max) {
      setScreen(() => index);
      setStatus((s) => ({ ...s, isPause: false }));
      setDisplayTime(() => scenario.postDisplayTime / 1000);
      setPositionSelected(() => []);
      res.userResponse = [];
    } else {
      console.log('Finished psychometrics assessments.');
    }
  }

  function onPressTiles(position: Positions) {
    const isCorrect = checkHighlighted(highlightedTiles, position);
    if (!isCorrect) {
      setPositionSelected(() => []);
      res.userResponse = [];
      clearTimeout(idTimeOut);
      setStatus((s) => ({ ...s, isPause: isCorrect }));
      idTimeOut = setTimeout(
        () => setStatus((s) => ({ ...s, isPause: !isCorrect })),
        500
      );
    } else {
      if (
        !userResponse.find(
          ({ posx, posy }) => posx === position.posx && posy === position.posy
        )
      ) {
        const positions = [...userResponse, position];
        setPositionSelected(() => positions);
        userResponse.push(position);
        if (highlightedTiles.length === positions.length) {
          let countCorrect = 0;
          for (let index = 0; index < positions.length; index++) {
            if (checkHighlighted(highlightedTiles, positions[index])) {
              countCorrect += 1;
            }
          }
          if (scenario.highlightedTiles === countCorrect) {
            console.log('You Win!');
            handleNextScreen();
          }
        }
      }
    }
  }

  useEffect(() => {
    let time = 0.0;
    idInterval = setInterval(() => {
      if (status.isPre) {
        if (time.toFixed(2) === '0.16') {
          setStatus((s) => ({ ...s, showGrid: true }));
        }
        if (time.toFixed(2) === '0.17') {
          setStatus((s) => ({
            ...s,
            isPost: true
          }));
        }
        if (Math.floor(time) === scenario.preDisplayTime / 1000) {
          setStatus((s) => ({
            ...s,
            isPre: false
          }));
        }
      }
      if (status.isPost && !status.isPre) {
        if (time.toFixed(2) === '0.16') {
          setStatus((s) => ({ ...s, isPause: true }));
        }
        const timeFloor = Math.floor(time);
        const maxTime = scenario.postDisplayTime / 1000;
        const dips = maxTime - timeFloor;
        setDisplayTime(() => dips);
        if (timeFloor === maxTime) {
          res.userResponse = [];
          handleNextScreen();
        }
      }
      time += 0.001;
    }, 0.001);
    return () => {
      clearInterval(idInterval);
    };
  }, [
    setStatus,
    screen,
    status.isPost,
    status.isPre,
    scenario.postDisplayTime,
    scenario.preDisplayTime
  ]);
  return (
    <div className={styles.container}>
      <p className={styles.displayTime}>{displayTime}</p>
      <Scenarios
        {...{
          scenario,
          onPressTiles,
          highlightedTiles,
          instructions,
          status,
          positionsSelected
        }}
      />
    </div>
  );
};
