const deepcopy = require('deep-copy');
const turnUtils = require('@local/engine/turnUtils');
const moveUtils = require('@local/engine/move/moveUtils');

const stateModify = (gameState, move, allowNewTurns = true) => {
  //Will not advance action counter
  var newGameState = deepcopy(gameState);

  for(var i = 0;i < newGameState.timelines.length;i++) {
    if(newGameState.timelines[i].timeline === move.sourcePosition[1]) {
      for(var j = 0;j < newGameState.timelines[i].turns.length;j++) {
        if(newGameState.timelines[i].turns[j].turn === move.sourcePosition[0] && newGameState.timelines[i].turns[j].playerTurn === move.player) {
          if(allowNewTurns) {
            var newTurn = deepcopy(newGameState.timelines[i].turns[j]);
            if(newTurn.playerTurn === 'white') {
              newTurn.playerTurn = 'black';
            }
            else {
              newTurn.turn++;
            }

            var piece = turnUtils.turnGetPiece(newTurn, move.sourcePosition.slice(2));
            newTurn = turnUtils.turnRemovePiece(newTurn, move.sourcePosition.slice(2));
            if(move.sourcePosition[1] === move.destinationPosition[1]) {
              newTurn = turnUtils.turnAddPiece(newTurn, move.destinationPosition.slice(2), move.destinationPiece ? move.destinationPiece : piece.type, move.player, true);
            }
            newGameState.timelines[i].turns.push(newTurn);
          }
        }
      }
    }
  }
  for(var i = 0;i < newGameState.timelines.length;i++) {
    if(newGameState.timelines[i].timeline === move.destinationPosition[1]) {
      for(var j = 0;j < newGameState.timelines[i].turns.length;j++) {
        if(newGameState.timelines[i].turns[j].turn === move.destinationPosition[0] && newGameState.timelines[i].turns[j].playerTurn === move.player) {
          if(allowNewTurns) {
            var newTurn = deepcopy(newGameState.timelines[i].turns[j]);
            if(newTurn.playerTurn === 'white') {
              newTurn.playerTurn = 'black';
            }
            else {
              newTurn.turn++;
            }
            if(moveUtils.checkPositionIsLatest(newGameState, move.destinationPosition, move.player)) {

            }
          }
        }
      }
    }
  }
  for(var i = 0;i < move.additionalMoves.length;i++) {
    newGameState = stateModify(newGameState, move.additionalMoves[i], false);
  }
  return newGameState;
};

exports.modifyStateWithMove = stateModify;
