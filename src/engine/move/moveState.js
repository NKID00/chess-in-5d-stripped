const deepcopy = require('deep-copy');
const turnUtils = require('@local/engine/turnUtils');
const stateUtils = require('@local/engine/stateUtils');
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
              newTurn.playerTurn = 'white';
              newTurn.turn++;
            }

            var piece = turnUtils.turnGetPiece(newTurn, move.sourcePosition.slice(2));
            newTurn = turnUtils.turnRemovePiece(newTurn, move.sourcePosition.slice(2));
            if(move.sourcePosition[0] === move.destinationPosition[0]) {
              newTurn = turnUtils.turnAddPiece(newTurn, move.destinationPosition.slice(2), move.destinationPiece ? move.destinationPiece : piece.type, move.player, true);
            }
            newGameState.timelines[i].turns.push(newTurn);
          }
          else {
            newGameState.timelines[i].turns[j] = turnUtils.turnRemovePiece(newGameState.timelines[i].turns[j], move.sourcePosition.slice(2));
          }
        }
      }
    }
  }
  for(var i = 0;i < newGameState.timelines.length;i++) {
    if(newGameState.timelines[i].timeline === move.destinationPosition[1]) {
      for(var j = 0;j < newGameState.timelines[i].turns.length;j++) {
        if(newGameState.timelines[i].turns[j].turn === move.destinationPosition[0] && newGameState.timelines[i].turns[j].playerTurn === move.player && (move.sourcePosition[0] !== move.destinationPosition[0] || move.sourcePosition[1] !== move.destinationPosition[1])) {
          if(allowNewTurns) {
            var newTurn = deepcopy(newGameState.timelines[i].turns[j]);
            if(newTurn.playerTurn === 'white') {
              newTurn.playerTurn = 'black';
            }
            else {
              newTurn.playerTurn = 'white';
              newTurn.turn++;
            }
            newTurn = turnUtils.turnAddPiece(newTurn, move.destinationPosition.slice(2), move.destinationPiece ? move.destinationPiece : piece.type, move.player, true);
            if(!moveUtils.checkPositionIsLatest(newGameState, move.destinationPosition, move.player)) {
              if(move.player === 'white') {
                var maxTimeline = 0;
                for(var k = 0;k < newGameState.timelines.length;k++) {
                  if(newGameState.timelines[k].timeline > maxTimeline) { maxTimeline = newGameState.timelines[k].timeline; }
                }
                newGameState.timelines.push({
                  timeline: maxTimeline + 1,
                  active: true,
                  turns: [
                    newTurn
                  ]
                });
              }
              if(move.player === 'black') {
                var minTimeline = 0;
                for(var k = 0;k < newGameState.timelines.length;k++) {
                  if(newGameState.timelines[k].timeline < minTimeline) { minTimeline = newGameState.timelines[k].timeline; }
                }
                newGameState.timelines.push({
                  timeline: minTimeline - 1,
                  active: true,
                  turns: [
                    newTurn
                  ]
                });
              }
            }
            else {
              newGameState.timelines[i].turns.push(newTurn);
            }
          }
        }
        if(
          !allowNewTurns &&
          ((move.player === 'white' &&
          newGameState.timelines[i].turns[j].turn === move.destinationPosition[0] &&
          newGameState.timelines[i].turns[j].playerTurn === 'black') ||
          (move.player === 'black' &&
          newGameState.timelines[i].turns[j].turn + 1 === move.destinationPosition[0] &&
          newGameState.timelines[i].turns[j].playerTurn === 'white'))
        ) {
          newGameState.timelines[i].turns[j] = turnUtils.turnAddPiece(
            newGameState.timelines[i].turns[j],
            move.destinationPosition.slice(2),
            move.destinationPiece ? move.destinationPiece : piece.type,
            move.player,
            true
          );
        }
      }
    }
  }
  for(var i = 0;i < move.additionalMoves.length;i++) {
    newGameState = stateModify(newGameState, move.additionalMoves[i], false);
  }
  newGameState = stateUtils.stateActivateTimelines(newGameState);
  return newGameState;
};

exports.modifyStateWithMove = stateModify;
