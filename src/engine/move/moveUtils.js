const deepcopy = require('deep-copy');

const checkPieceBlock = (gameState, currPosition, player) => {
  var res = {
    isBlocking: false,
    capturePieceStr: null
  }
  for(var i = 0;i < gameState.timelines.length;i++) {
    if(gameState.timelines[i].timeline === currPosition[1]) {
      for(var j = 0;j < gameState.timelines[i].turns.length;j++) {
        if(gameState.timelines[i].turns[j].playerTurn === player && gameState.timelines[i].turns[j].turn === currPosition[0]) {
          for(var k = 0;k < gameState.timelines[i].turns[j].pieces.length;k++) {
            var currPiece = gameState.timelines[i].turns[j].pieces[k];
            if(currPiece.position[0] === currPosition[2] && currPiece.position[1] === currPosition[3]) {
              res.isBlocking = true;
              res.capturePieceStr = currPiece.player !== player ? currPiece.type : null;
            }
          }
        }
      }
    }
  }
  return res;
};

const checkPositionExists = (gameState, currPosition, player) => {
  var res = false;
  for(var i = 0;i < gameState.timelines.length;i++) {
    if(gameState.timelines[i].timeline === currPosition[1]) {
      for(var j = 0;j < gameState.timelines[i].turns.length;j++) {
        if(gameState.timelines[i].turns[j].playerTurn === player && gameState.timelines[i].turns[j].turn === currPosition[0]) {
          if(currPosition[2] >= 0 && currPosition[2] <= 7 && currPosition[3] >= 0 && currPosition[3] <= 7) {
            res = true;
          }
        }
      }
    }
  }
  return res;
};

const checkPositionIsLatest = (gameState, currPosition, player) => {
  for(var i = 0;i < gameState.timelines.length;i++) {
    if(gameState.timelines[i].timeline === currPosition[1]) {
      var highestTurn = -1;
      var highestTurnPlayer = 'white';
      for(var j = 0;j < gameState.timelines[i].turns.length;j++) {
        if(highestTurn <= gameState.timelines[i].turns[j].turn) {
          if(highestTurnPlayer === 'white' && gameState.timelines[i].turns[j].playerTurn === 'black') {
            highestTurnPlayer = gameState.timelines[i].turns[j].playerTurn;
          }
          if(highestTurn < gameState.timelines[i].turns[j].turn) {
            highestTurnPlayer = gameState.timelines[i].turns[j].playerTurn;
          }
          highestTurn = gameState.timelines[i].turns[j].turn;
        }
      }
      return (player === highestTurnPlayer && highestTurn === currPosition[0]);
    }
  }
  return false;
};

exports.checkPieceBlock = checkPieceBlock;
exports.checkPositionExists = checkPositionExists;
exports.checkPositionIsLatest = checkPositionIsLatest;
