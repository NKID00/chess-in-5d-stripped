import Chess from '5d-chess-js';

var botGlobal = {};

export function compute(state, funcStr) {
  var botFunc = new Function('Chess', 'chessInstance', 'GPU', 'global', 'return ' + funcStr)();
  var chess = new Chess();
  chess.state(state);
  var action = botFunc(Chess, chess, undefined, botGlobal);
  return action;
}
