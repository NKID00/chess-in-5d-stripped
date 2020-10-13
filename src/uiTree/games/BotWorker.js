import Chess from '5d-chess-js';

const { GPU } = require('gpu.js');
var botGlobal = {};

export function compute(actions, funcStr) {
  var botFunc = new Function('Chess', 'chessInstance', 'GPU', 'global', 'return ' + funcStr)();
  var action = botFunc(Chess, new Chess(actions), GPU, botGlobal);
  return action;
}
