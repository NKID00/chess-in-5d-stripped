import Chess from '5d-chess-js';

export function compute(actions, funcStr) {
  var botFunc = new Function('Chess', 'chessInstance', 'return ' + funcStr)();
  var action = botFunc(Chess, new Chess(actions));
  return action;
}
