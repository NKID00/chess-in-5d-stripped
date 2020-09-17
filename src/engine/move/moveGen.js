const vecGen = require('@local/engine/vecGen');
const pieceDefs =  require('@local/engine/defs/pieceDefinitions').defs;
const moveUtils = require('@local/engine/move/moveUtils');
const stateUtils = require('@local/engine/stateUtils');

const pieceMoveGen = (gameState, currPosition, pieceStr, maxTurn = null, minTimeline = null, maxTimeline = null) => {
  var res = [];
  if(maxTurn === null || minTimeline === null || maxTimeline === null) {
    minTimeline = 0;
    maxTimeline = 0;
    maxTurn = 0;
    for(var i = 0;i < gameState.timelines.length;i++) {
      if(gameState.timelines[i].timeline > maxTimeline) {
        maxTimeline = gameState.timelines[i].timeline;
      }
      if(gameState.timelines[i].timeline < minTimeline) {
        minTimeline = gameState.timelines[i].timeline;
      }
      for(var j = 0;j < gameState.timelines[i].turns.length;j++) {
        if(gameState.timelines[i].turns[j].turn > maxTurn) {
          maxTurn = gameState.timelines[i].turns[j].turn;
        }
      }
    }
  }
  var pieceDef = null;
  for(var i = 0;i < pieceDefs.length;i++) {
    if(pieceStr === pieceDefs[i].name) {
      pieceDef = pieceDefs[i];
    }
  }
  if(pieceDef !== null) {
    for(var i = 0;i < pieceDef.moveSpec.length;i++) {
      var newPosition = currPosition.slice();
      newPosition[0] += pieceDef.moveSpec[i][0];
      newPosition[1] += pieceDef.moveSpec[i][1];
      newPosition[2] += pieceDef.moveSpec[i][2];
      newPosition[3] += pieceDef.moveSpec[i][3];

      if(newPosition[0] >= 1 && newPosition[0] <= maxTurn) {
        if(newPosition[1] >= minTimeline && newPosition[1] <= maxTimeline) {
          if(newPosition[2] >= 0 && newPosition[2] <= 7) {
            if(newPosition[3] >= 0 && newPosition[3] <= 7) {
              if(moveUtils.checkPositionExists(gameState, newPosition, gameState.playerAction)) {
                var newMove = {};
                newMove.action = gameState.action;
                newMove.player = gameState.playerAction;
                newMove.pieceCapture = null;
                newMove.sourcePosition = currPosition.slice();
                newMove.destinationPosition = newPosition.slice();
                newMove.destinationPiece = null;
                newMove.additionalMoves = [];

                var pieceBlock = moveUtils.checkPieceBlock(gameState, newPosition, gameState.playerAction,  gameState.playerAction);
                blocking = pieceBlock.isBlocking;
                if(!blocking) {
                  res.push(newMove);
                }
                else {
                  if(pieceBlock.capturePieceStr !== null) {
                    newMove.pieceCapture = {
                      piece: pieceBlock.capturePieceStr,
                      position: newPosition.slice()
                    }
                    res.push(newMove);
                  }
                }
              }
            }
          }
        }
      }
    }
    for(var i = 0;i < pieceDef.moveVec.length;i++) {
      var vec = vecGen.generate(maxTurn, minTimeline, maxTimeline, currPosition, pieceDef.moveVec[i]);
      var blocking = false;
      for(var j = 0;j < vec.length && !blocking;j++) {
        var newPosition = vec[j].slice();

        if(moveUtils.checkPositionExists(gameState, newPosition, gameState.playerAction)) {
          var newMove = {};
          newMove.action = gameState.action;
          newMove.player = gameState.playerAction;
          newMove.pieceCapture = null;
          newMove.sourcePosition = currPosition.slice();
          newMove.destinationPosition = newPosition.slice();
          newMove.destinationPiece = null;
          newMove.additionalMoves = [];

          var pieceBlock = moveUtils.checkPieceBlock(gameState, newPosition, gameState.playerAction,  gameState.playerAction);
          blocking = pieceBlock.isBlocking;
          if(!blocking) {
            res.push(newMove);
          }
          else {
            if(pieceBlock.capturePieceStr !== null) {
              newMove.pieceCapture = {
                piece: pieceBlock.capturePieceStr,
                position: newPosition.slice()
              }
              res.push(newMove);
            }
          }
        }
      }
    }
    var genMoves = pieceDef.moveGen(gameState, currPosition);
    for(var i = 0;i < genMoves.length;i++) {
      res.push(genMoves[i]);
    }
  }
  return res;
};

const possibleMoveGen = (gameState, onlyActive = false, onlyPresent = false) => {
  var res = [];
  var minTimeline = 0;
  var maxTimeline = 0;
  for(var i = 0;i < gameState.timelines.length;i++) {
    if(gameState.timelines[i].timeline > maxTimeline) {
      maxTimeline = gameState.timelines[i].timeline;
    }
    if(gameState.timelines[i].timeline < minTimeline) {
      minTimeline = gameState.timelines[i].timeline;
    }
  }
  for(var i = 0;i < gameState.timelines.length;i++) {
    var needsMove = stateUtils.stateGetNeedMove(gameState);
    if((!onlyActive || gameState.timelines[i].active) && (!onlyPresent || needsMove.includes(i))) {
      var highestCurrPlayerTurnIndex = -1;
      var highestCurrPlayerTurn = -1;
      var highestTurn = -1;
      for(var j = 0;j < gameState.timelines[i].turns.length;j++) {
        if(gameState.timelines[i].turns[j].turn > highestTurn) {
          highestTurn = gameState.timelines[i].turns[j].turn;
        }
        if(gameState.timelines[i].turns[j].turn > highestCurrPlayerTurn && gameState.playerAction === gameState.timelines[i].turns[j].playerTurn) {
          highestCurrPlayerTurn = gameState.timelines[i].turns[j].turn;
          highestCurrPlayerTurnIndex = j;
        }
      }
      if(highestCurrPlayerTurn > 0 && highestCurrPlayerTurn === highestTurn && moveUtils.checkPositionIsLatest(gameState, [
        gameState.timelines[i].turns[highestCurrPlayerTurnIndex].turn,
        gameState.timelines[i].timeline,
        0,
        0
      ], gameState.playerAction)) {
        for(var k = 0;k < gameState.timelines[i].turns[highestCurrPlayerTurnIndex].pieces.length;k++) {
          var currPiece = gameState.timelines[i].turns[highestCurrPlayerTurnIndex].pieces[k];
          if(currPiece.player === gameState.playerAction) {
            var genMoves = pieceMoveGen(gameState, [
              gameState.timelines[i].turns[highestCurrPlayerTurnIndex].turn,
              gameState.timelines[i].timeline,
              currPiece.position[0],
              currPiece.position[1]
            ], currPiece.type, highestCurrPlayerTurn, minTimeline, maxTimeline);
            for(var j = 0;j < genMoves.length;j++) {
              res.push(genMoves[j]);
            }
          }
        }
      }
    }
  }
  return res;
};

exports.possibleMoveGen = possibleMoveGen;
exports.pieceMoveGen = pieceMoveGen;
