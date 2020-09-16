const deepcopy = require('deep-copy');
const moveUtils = require('@local/engine/move/moveUtils');

const turnRemovePiece = (turn, position) => {
  var newTurn = deepcopy(turn);
  for(var i = 0;i < newTurn.pieces.length;i++) {
    var currPiece = newTurn.pieces[i];
    if(currPiece.position[0] === position[0] && currPiece.position[1] === position[1]) {
      var tmpBefore = newTurn.pieces.slice(0,i);
      var tmpAfter = newTurn.pieces.slice(i+1);
      for(var j = 0;j < tmpAfter.length;j++) {
        tmpBefore.push(tmpAfter[j]);
      }
      newTurn.pieces = tmpBefore;
      i--;
    }
  }
  return newTurn;
};

const turnAddPiece = (turn, position, type, player, moved = true) => {
  var newTurn = deepcopy(turn);
  newTurn.pieces.push({
    type: type,
    player: player,
    hasMoved: moved,
    position: position
  })
  return newTurn;
};

const turnGetPiece = (turn, position) => {
  for(var i = 0;i < turn.pieces.length;i++) {
    var currPiece = turn.pieces[i];
    if(currPiece.position[0] === position[0] && currPiece.position[1] === position[1]) {
      return currPiece;
    }
  }
  return null;
};

exports.turnRemovePiece = turnRemovePiece;
exports.turnAddPiece = turnAddPiece;
exports.turnGetPiece = turnGetPiece;
