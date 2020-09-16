const vecGen = require('@local/engine/vecGen');
const pieceDefs =  require('@local/engine/defs/pieceDefinitions').defs;
const moveUtils = require('@local/engine/move/moveUtils');

const generateHighlights = (gameState, currPosition, playerTurn) => {
  var res = [];
  var maxTimeline = 0;
  var minTimeline = 0;
  var maxTurn = 0;
  for(var i = 0;i < gameState.timelines.length;i++) {
    if(gameState.timelines[i].timeline > maxTimeline) {
      maxTimeline = gameState.timelines[i].timeline;
    }
    if(gameState.timelines[i].timeline < minTimeline) {
      minTimeline = gameState.timelines[i].timeline;
    }
    for(var j = 0;j < gameState.timelines[i].turns.length;j++) {
      if(gameState.timelines[i].turns[j].turn > maxTurn && playerTurn === gameState.timelines[i].turns[j].playerTurn) {
        maxTurn = gameState.timelines[i].turns[j].turn;
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
              if(moveUtils.checkPositionExists(gameState, newPosition, playerTurn)) {
                var newHighlight = {};
                newHighlight.type = 'move';
                newHighlight.playerTurn = playerTurn;
                newHighlight.position = newPosition.slice();

                var pieceBlock = moveUtils.checkPieceBlock(gameState, newPosition, playerTurn);
                blocking = pieceBlock.isBlocking;
                if(!blocking) {
                  res.push(newHighlight);
                }
                else {
                  if(pieceBlock.capturePieceStr !== null) {
                    newHighlight.type = 'capture';
                    res.push(newHighlight);
                  }
                  else {
                    newHighlight.type = 'blocking';
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

        if(moveUtils.checkPositionExists(gameState, newPosition, playerTurn)) {
          var newHighlight = {};
          newHighlight.type = 'move';
          newHighlight.playerTurn = playerTurn;
          newHighlight.position = newPosition.slice();

          var pieceBlock = moveUtils.checkPieceBlock(gameState, newPosition, playerTurn);
          blocking = pieceBlock.isBlocking;
          if(!blocking) {
            res.push(newHighlight);
          }
          else {
            if(pieceBlock.capturePieceStr !== null) {
              newHighlight.type = 'capture';
              res.push(newHighlight);
            }
            else {
              newHighlight.type = 'blocking';
            }
          }
        }
      }
    }
    var genHighlights = pieceDef.highlightGen(gameState, currPosition);
    for(var i = 0;i < genMoves.length;i++) {
      res.push(genHighlights[i]);
    }
  }
  return res;
}

exports.generateHighlights = generateHighlights;
