const deepcopy = require('deep-copy');
const moveGen = require('@local/engine/move/moveGen');

const stateActivateTimelines = (gameState) => {
  var newGameState = deepcopy(gameState);
  var maxTimeline = 0;
  var minTimeline = 0;
  for(var i = 0;i < newGameState.timelines.length;i++) {
    if(newGameState.timelines[i].timeline > maxTimeline) {
      maxTimeline = newGameState.timelines[i].timeline;
    }
    if(newGameState.timelines[i].timeline < minTimeline) {
      minTimeline = newGameState.timelines[i].timeline;
    }
  }
  for(var i = 0;i < newGameState.timelines.length;i++) {
    if(newGameState.timelines[i].timeline > (-1 * minTimeline)) {
      newGameState.timelines[i].active = false;
    }
    else if(newGameState.timelines[i].timeline < (-1 * maxTimeline)) {
      newGameState.timelines[i].active = false;
    }
    else {
      newGameState.timelines[i].active = true;
    }
  }
  return newGameState;
}

const stateAddTurnPass = (gameState) => {
  //Adds 'Pass' moves to all boards in present
  var newGameState = deepcopy(gameState);
  var arr = stateGetNeedMove(newGameState);
  for(var i = 0;i < arr.length;i++) {
    var currTimeline = newGameState.timelines[arr[i]];
    var maxTurn = -1;
    var maxTurnIndex = -1;
    for(var j = 0;j < currTimeline.turns.length;j++) {
      if(currTimeline.turns[j].turn > maxTurn && currTimeline.turns[j].playerTurn === gameState.playerAction) {
        maxTurnIndex = j;
        maxTurn = currTimeline.turns[j].turn;
      }
    }
    var newTurn = deepcopy(currTimeline.turns[maxTurnIndex]);
    if(newTurn.playerTurn === 'white') {
      newTurn.playerTurn = 'black';
    }
    else {
      newTurn.playerTurn = 'white';
      newTurn.turn++;
    }
    newGameState.timelines[arr[i]].push(newTurn);
  }
  return newGameState;
}

const stateGetNeedMove = (gameState) => {
  //Return index of timelines needing a move
  var res = [];
  var lowestTurn = -1;
  for(var i = 0;i < gameState.timelines.length;i++) {
    if(gameState.timelines[i].active) {
      var currMax = 0;
      var maxPlayer = '';
      for(var j = 0;j < gameState.timelines[j].turns.length;j++) {
        if(currMax < gameState.timelines[j].turns[j].turn) {
          currMax = gameState.timelines[j].turns[j].turn;
          maxPlayer = gameState.timelines[j].turns[j].playerTurn;
        }
        else if(currMax === gameState.timelines[j].turns[j].turn) {
          if(maxPlayer === 'white' && gameState.timelines[j].turns[j].playerTurn === 'black') {
            maxPlayer = gameState.timelines[j].turns[j].playerTurn;
          }
        }
      }
      if(maxPlayer === gameState.playerAction && (currMax <= lowestTurn || lowestTurn === -1)) {
        lowestTurn = currMax;
      }
    }
  }
  for(var i = 0;i < gameState.timelines.length;i++) {
    if(gameState.timelines[i].active) {
      if(gameState.playerAction === 'white') {
        if(Math.floor(gameState.timelines[i].turns.length/2) + 1 === lowestTurn) {
          res.push(i);
        }
      }
      else {
        if(Math.floor(gameState.timelines[i].turns.length/2) === lowestTurn) {
          res.push(i);
        }
      }
    }
  }
  return res;
}

const stateGetChecks = (gameState) => {
  //return moves of checks
  var res = [];
  var newGameState = deepcopy(gameState);
  newGameState = stateAddTurnPass(newGameState);
  var possibleOpponentMoves = moveGen.generatePossibleMoves(newGameState);
  for(var i = 0;i < possibleOpponentMoves.length;i++) {
    if(possibleOpponentMoves[i].pieceCapture !== null) {
      if(possibleOpponentMoves[i].pieceCapture.piece === 'king') {
        res.push(possibleOpponentMoves[i]);
      }
    }
  }
  return res;
}

exports.stateActivateTimelines = stateActivateTimelines;
exports.stateGetChecks = stateGetChecks;
exports.stateGetNeedMove = stateGetNeedMove;
