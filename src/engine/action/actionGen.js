const deepcopy = require('deep-copy');
const stateUtils = require('@local/engine/stateUtils');
const moveGen = require('@local/engine/move/moveGen');
const moveState = require('@local/engine/move/moveState');

const possibleActionGen = (gameState, onlyActive = true, onlyPresent = true) => {
  var recurse = (gameState) => {
    var newArr = [];
    var newGameState = deepcopy(gameState);
    var moves = moveGen.possibleMoveGen(newGameState, onlyActive, onlyPresent);
    for(var i = 0;i < moves.length;i++) {
      var moddedGameState = deepcopy(moveState.stateModify(newGameState, moves[i]));
      if(stateUtils.stateGetNeedMove(moddedGameState).length !== 0) {
        var nextLayer = recurse(moddedGameState);
        for(var j = 0;j < nextLayer.length;j++) {
          var currArr = [moves[i]];
          for(var k = 0;k < nextLayer[j].length;k++) {
            currArr.push(nextLayer[j][k]);
          }
          newArr.push(currArr);
        }
        if(nextLayer.length === 0) {
          newArr.push([moves[i]]);
        }
      }
      else {
        newArr.push([moves[i]]);
      }
    }
    return newArr;
  }
  return recurse(gameState);
}

exports.possibleActionGen = possibleActionGen;
