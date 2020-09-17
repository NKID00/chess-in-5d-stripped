const deepcopy = require('deep-copy');
const moveState = require('@local/engine/move/moveState');

const stateModify = (gameState, moves) => {
  var newGameState = deepcopy(gameState);
  for(var i = 0;i < moves.length;i++) {
    newGameState = moveState.stateModify(newGameState, moves[i]);
  }
  return newGameState;
}

exports.stateModify = stateModify;
