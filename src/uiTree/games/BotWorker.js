import Chess from '5d-chess-js';

const { GPU } = require('gpu.js');

export function compute(actions, funcStr) {
  var botFunc = new Function('Chess', 'chessInstance', 'GPU', 'return ' + funcStr)();
  var action = botFunc(Chess, new Chess(actions), GPU);
  return action;
}
