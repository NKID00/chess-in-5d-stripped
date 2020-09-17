const deepcopy = require('deep-copy');
const stateUtils = require('@local/engine/stateUtils');
const moveState = require('@local/engine/move/moveState');

const stateModify = (gameState, moves) => {
  var newGameState = deepcopy(gameState);
  for(var i = 0;i < moves.length;i++) {
    newGameState = moveState.stateModify(newGameState, moves[i]);
  }
  return newGameState;
}

const stateAdvanceAction = (gameState, action) => {
  var newGameState = deepcopy(gameState);
  var newGameState2 = stateModify(newGameState, action);
  if(stateUtils.stateGetNeedMove(newGameState2).length > 0) {
    console.log('Needs Moves still: ')
    console.log(stateUtils.stateGetNeedMove(newGameState2))
    console.log(newGameState2.timelines[stateUtils.stateGetNeedMove(newGameState2)[0]])
    console.log(newGameState2.playerAction)
  }
  if(stateUtils.stateGetNeedMove(newGameState2).length === 0 && stateUtils.stateGetChecks(newGameState2).length === 0) {
    newGameState = newGameState2;
    if(newGameState.playerAction === 'white') {
      newGameState.playerAction = 'black';
    }
    else {
      newGameState.playerAction = 'white';
      newGameState.action++;
    }
  }
  return newGameState;
}

exports.stateModify = stateModify;
exports.stateAdvanceAction = stateAdvanceAction;
