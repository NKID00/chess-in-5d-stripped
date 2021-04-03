import Chess from '5d-chess-js';

var botGlobal = {};

export function compute(state, timed, funcStr) {
  var botFunc = new Function('chess', 'timed', 'global', 'return ' + funcStr)();
  var chess = new Chess();
  chess.state(state);
  var action = botFunc(chess, timed, botGlobal);
  return action;
}
