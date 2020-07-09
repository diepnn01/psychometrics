import React__default, { createElement, useState, useMemo, useEffect } from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var styles = {"container":"_1Lxpd","button":"_2hTXI","displayTime":"_3XM5h"};

var Styles = {
  container: {
    borderRadius: 6,
    cursor: 'pointer'
  }
};

var TILES_WIDTH = 50;
var TILES_HEIGHT = 50;
var TILES_SPACE = 6;
var BG_HIGHLIGHTED = '#414ba5';
var BG_HIGHLIGHTER = 'white';

var Tiles = function Tiles(_ref) {
  var height = _ref.height,
      width = _ref.width,
      margin = _ref.margin,
      onClick = _ref.onClick,
      isHighlighted = _ref.isHighlighted,
      disable = _ref.disable,
      keepHighlighted = _ref.keepHighlighted;
  return createElement("div", Object.assign({
    role: 'button'
  }, {
    onClick: onClick
  }, {
    key: new Date().toISOString() + Math.random(),
    style: _extends({}, Styles.container, {
      width: width,
      height: height,
      margin: margin,
      pointerEvents: disable ? 'none' : 'all',
      background: keepHighlighted ? BG_HIGHLIGHTER : BG_HIGHLIGHTED,
      animation: 'anim-highlighted',
      animationDuration: '0.16s',
      animationDirection: 'alternate',
      animationPlayState: 'running',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: isHighlighted ? 'infinite' : 0
    })
  }));
};

var Styles$1 = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyItems: 'center'
  }
};

var styles$1 = {"container":"_18U9H","text":"_3gpJI"};

var Tooltip = function Tooltip(_ref) {
  var text = _ref.text,
      left = _ref.left,
      marginTop = _ref.marginTop;
  return createElement("div", {
    style: {
      left: left,
      marginTop: marginTop
    },
    className: styles$1.container
  }, createElement("span", {
    className: styles$1.text
  }, text));
};

function calculatorPosition(index, col) {
  return {
    posx: index % col,
    posy: Math.floor(index / col)
  };
}
function checkHighlighted(positions, pos) {
  return positions && !!positions.find(function (_ref) {
    var posx = _ref.posx,
        posy = _ref.posy;
    return posx === pos.posx && posy === pos.posy;
  });
}
function getHighlightedTiles(_ref2) {
  var numOfTiles = _ref2.highlightedTiles,
      grid = _ref2.grid;

  var _grid$split$map = grid.split('*').map(function (n) {
    return +n || 0;
  }),
      row = _grid$split$map[0],
      col = _grid$split$map[1];

  var highlightedTiles = [];

  var _loop = function _loop() {
    if (highlightedTiles.length === Math.min(numOfTiles, row * col)) {
      return "break";
    }

    var posx = Math.floor(Math.random() * col);
    var posy = Math.floor(Math.random() * row);
    var isExists = highlightedTiles.find(function (obj) {
      return (obj === null || obj === void 0 ? void 0 : obj.posx) === posx && (obj === null || obj === void 0 ? void 0 : obj.posy) === posy;
    });

    if (!isExists) {
      highlightedTiles.push({
        posx: posx,
        posy: posy
      });
    }
  };

  while (true) {
    var _ret = _loop();

    if (_ret === "break") break;
  }

  return highlightedTiles;
}

var Scenarios = function Scenarios(_ref) {
  var grid = _ref.scenario.grid,
      onPressTiles = _ref.onPressTiles,
      instructions = _ref.instructions,
      highlightedTiles = _ref.highlightedTiles,
      status = _ref.status,
      positionsSelected = _ref.positionsSelected;

  var _grid$split$map = grid === null || grid === void 0 ? void 0 : grid.split('*').map(function (n) {
    return +n || 0;
  }),
      row = _grid$split$map[0],
      col = _grid$split$map[1];

  var handleOnClick = React__default.useCallback(function (position) {
    return function () {
      return onPressTiles === null || onPressTiles === void 0 ? void 0 : onPressTiles(position);
    };
  }, [onPressTiles]);

  function renderTiles(_, index) {
    var position = calculatorPosition(index, col);
    return React__default.createElement(Tiles, {
      width: TILES_WIDTH,
      height: TILES_HEIGHT,
      margin: TILES_SPACE / 2,
      key: "tiles-" + index,
      onClick: handleOnClick(position),
      disable: !status.isPause,
      keepHighlighted: checkHighlighted(positionsSelected, position),
      isHighlighted: !status.isPause && checkHighlighted(highlightedTiles, position)
    });
  }

  var width = col * TILES_WIDTH + TILES_SPACE * col;
  var height = row * TILES_HEIGHT + TILES_SPACE * col;
  return React__default.createElement("div", {
    style: _extends({}, Styles$1.grid, {
      width: width,
      height: height
    })
  }, status.showGrid && Array.apply(null, new Array(row * col)).map(renderTiles), React__default.createElement(Tooltip, {
    marginTop: height + 16 + "px",
    left: 'calc(50% - 88px)',
    text: status.isPre ? instructions === null || instructions === void 0 ? void 0 : instructions.pre : instructions === null || instructions === void 0 ? void 0 : instructions.post
  }));
};

var styleSheet = document.styleSheets[0];
var styleKeyFrames = "\n    @keyframes anim-highlighted {\n      0%   {background-color:" + BG_HIGHLIGHTED + ";}\n      100% {background-color:" + BG_HIGHLIGHTER + ";}\n    }\n  ";
styleSheet.insertRule(styleKeyFrames, styleSheet.cssRules.length);
var idInterval;
var idTimeOut;
var initStatus = {
  isPause: false,
  isPost: false,
  isPre: true,
  showGrid: false
};
var Psychometrics = function Psychometrics(_ref) {
  var _ref$configuration = _ref.configuration,
      instructions = _ref$configuration.instructions,
      scenarios = _ref$configuration.scenarios;

  var _useState = useState(0),
      screen = _useState[0],
      setScreen = _useState[1];

  var scenario = scenarios[screen];

  var _useState2 = useState(0),
      displayTime = _useState2[0],
      setDisplayTime = _useState2[1];

  var _useState3 = useState(initStatus),
      status = _useState3[0],
      setStatus = _useState3[1];

  var _useState4 = useState([]),
      positionsSelected = _useState4[0],
      setPositionSelected = _useState4[1];

  var res = useMemo(function () {
    return {
      highlightedTiles: getHighlightedTiles(scenario),
      userResponse: []
    };
  }, [scenario, screen]);
  var highlightedTiles = res.highlightedTiles,
      userResponse = res.userResponse;

  function handleNextScreen() {
    console.log("Screen " + scenario.grid + " response:", {
      scenario: {
        highlightedTiles: highlightedTiles,
        userResponse: userResponse
      }
    });
    var max = scenarios.length - 1;
    var index = Math.min(screen + 1, max);
    clearInterval(idInterval);

    if (index !== max) {
      setScreen(function () {
        return index;
      });
      setStatus(function (s) {
        return _extends({}, s, {
          isPause: false
        });
      });
      setDisplayTime(function () {
        return scenario.postDisplayTime / 1000;
      });
      setPositionSelected(function () {
        return [];
      });
      res.userResponse = [];
    } else {
      console.log('Finished psychometrics assessments.');
    }
  }

  function onPressTiles(position) {
    var isCorrect = checkHighlighted(highlightedTiles, position);

    if (!isCorrect) {
      setPositionSelected(function () {
        return [];
      });
      res.userResponse = [];
      clearTimeout(idTimeOut);
      setStatus(function (s) {
        return _extends({}, s, {
          isPause: isCorrect
        });
      });
      idTimeOut = setTimeout(function () {
        return setStatus(function (s) {
          return _extends({}, s, {
            isPause: !isCorrect
          });
        });
      }, 500);
    } else {
      if (!userResponse.find(function (_ref2) {
        var posx = _ref2.posx,
            posy = _ref2.posy;
        return posx === position.posx && posy === position.posy;
      })) {
        var positions = [].concat(userResponse, [position]);
        setPositionSelected(function () {
          return positions;
        });
        userResponse.push(position);

        if (highlightedTiles.length === positions.length) {
          var countCorrect = 0;

          for (var index = 0; index < positions.length; index++) {
            if (checkHighlighted(highlightedTiles, positions[index])) {
              countCorrect += 1;
            }
          }

          if (scenario.highlightedTiles === countCorrect) {
            handleNextScreen();
          }
        }
      }
    }
  }

  useEffect(function () {
    var time = 0.0;
    idInterval = setInterval(function () {
      if (status.isPre) {
        if (time.toFixed(2) === '0.16') {
          setStatus(function (s) {
            return _extends({}, s, {
              showGrid: true
            });
          });
        }

        if (time.toFixed(2) === '0.17') {
          setStatus(function (s) {
            return _extends({}, s, {
              isPost: true
            });
          });
        }

        if (Math.floor(time) === scenario.preDisplayTime / 1000) {
          setStatus(function (s) {
            return _extends({}, s, {
              isPre: false
            });
          });
        }
      }

      if (status.isPost && !status.isPre) {
        if (time.toFixed(2) === '0.16') {
          setStatus(function (s) {
            return _extends({}, s, {
              isPause: true
            });
          });
        }

        var timeFloor = Math.floor(time);
        var maxTime = scenario.postDisplayTime / 1000;
        var dips = maxTime - timeFloor;
        setDisplayTime(function () {
          return dips;
        });

        if (timeFloor === maxTime) {
          handleNextScreen();
        }
      }

      time += 0.001;
    }, 0.001);
    return function () {
      clearInterval(idInterval);
    };
  }, [setStatus, screen, status.isPost, status.isPre, scenario.postDisplayTime, scenario.preDisplayTime]);
  return React__default.createElement("div", {
    className: styles.container
  }, React__default.createElement("p", {
    className: styles.displayTime
  }, displayTime), React__default.createElement(Scenarios, Object.assign({}, {
    scenario: scenario,
    onPressTiles: onPressTiles,
    highlightedTiles: highlightedTiles,
    instructions: instructions,
    status: status,
    positionsSelected: positionsSelected
  })));
};

export { Psychometrics };
//# sourceMappingURL=index.modern.js.map
