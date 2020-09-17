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
    if(newGameState.timelines[i].timeline > (-1 * minTimeline) + 1) {
      newGameState.timelines[i].active = false;
    }
    else if(newGameState.timelines[i].timeline < (-1 * maxTimeline) - 1) {
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
    newGameState.timelines[arr[i]].turns.push(newTurn);
  }
  return newGameState;
}

const stateGetNeedMove = (gameState) => {
  //Return index of timelines needing a move
  var res = [];
  var lowestTurn = -1;
  for(var i = 0;i < gameState.timelines.length;i++) {
    if(gameState.timelines[i].active) {
      var currMax = -1;
      var maxPlayer = '';
      for(var j = 0;j < gameState.timelines[i].turns.length;j++) {
        if(currMax < gameState.timelines[i].turns[j].turn && gameState.timelines[i].turns[j].playerTurn === gameState.playerAction) {
          currMax = gameState.timelines[i].turns[j].turn;
        }
      }
      if(currMax <= lowestTurn || lowestTurn === -1) {
        lowestTurn = currMax;
      }
    }
  }
  if(lowestTurn > 0) {
    for(var i = 0;i < gameState.timelines.length;i++) {
      if(gameState.timelines[i].active) {
        var isHigher = false;
        for(var j = 0;j < gameState.timelines[i].turns.length;j++) {
          if(gameState.timelines[i].turns[j].turn > lowestTurn) {
            isHigher = true;
          }
          if(gameState.playerAction === 'white' && gameState.timelines[i].turns[j].turn === lowestTurn && gameState.timelines[i].turns[j].playerTurn === 'black') {
            isHigher = true;
          }
        }
        if(!isHigher) {
          res.push(i);
        }
      }
    }
  }
  return res;
}

const stateGetChecks = (gameState, onlyActive = false, onlyPresent = false) => {
  //return moves of checks
  var res = [];
  var newGameState = deepcopy(gameState);
  newGameState = stateAddTurnPass(newGameState);
  var possibleOpponentMoves = moveGen.possibleMoveGen(newGameState, onlyActive, onlyPresent);
  for(var i = 0;i < possibleOpponentMoves.length;i++) {
    if(possibleOpponentMoves[i].pieceCapture !== null) {
      if(possibleOpponentMoves[i].pieceCapture.piece === 'king') {
        res.push(possibleOpponentMoves[i]);
      }
    }
  }
  return res;
}

const stateGetTurn = (gameState, currPosition, customPlayer = null) => {
  for(var i = 0;i < gameState.timelines.length;i++) {
    if(gameState.timelines[i].timeline === currPosition[1]) {
      for(var j = 0;j < gameState.timelines[i].turns.length;j++) {
        if(gameState.timelines[i].turns[j].turn === currPosition[0] && gameState.timelines[i].turns[j].playerTurn === (customPlayer ? customPlayer : gameState.playerAction)) {
          return gameState.timelines[i].turns[j];
        }
      }
    }
  }
  return {};
}

exports.stateActivateTimelines = stateActivateTimelines;
exports.stateGetChecks = stateGetChecks;
exports.stateGetNeedMove = stateGetNeedMove;
exports.stateGetTurn = stateGetTurn;
