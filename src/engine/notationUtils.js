const deepcopy = require('deep-copy');
const stateUtils = require('@local/engine/stateUtils');
const turnUtils = require('@local/engine/turnUtils');

const notationGetNotationFromMove = (gameState, move, expanded = true) => {
  //(Action #)(Color). [Turn #][+/- Line #]:(Piece)[Coord]<[+/- New Line #]>[Dest Turn #][Dest +/- Line #]:[Capture][Promotion Piece][Dest Coord][Check][En Passant]
  var res = '';
  res += move.action;
  res += move.player === 'white' ? 'w' : 'b';
  res += '. ';
  res += move.sourcePosition[0];
  if(move.sourcePosition[1] > 0) {
    res += '+' + move.sourcePosition[1];
  }
  else if(move.sourcePosition[1] < 0) {
    res += move.sourcePosition[1];
  }
  res += ':';
  var sourceTurn = stateUtils.stateGetTurn(gameState, move.sourcePosition, move.player);
  var sourcePiece = turnUtils.turnGetPiece(sourceTurn, move.sourcePosition.slice(2));
  if(sourcePiece.type !== 'pawn' && sourcePiece.type !== 'knight') {
    res += sourcePiece.type.charAt(0).toUpperCase();
  }
  else if(sourcePiece.type === 'knight') {
    res += 'N';
  }
  res += sanCoord(move.sourcePosition.slice(2)).str;
  res += '<>';
  res += move.destinationPosition[0];
  if(move.destinationPosition[1] > 0) {
    res += '+' + move.destinationPosition[1];
  }
  else if(move.destinationPosition[1] < 0) {
    res += move.destinationPosition[1];
  }
  res += ':';
  if(move.pieceCapture !== null) {
    res += 'x';
  }
  if(move.destinationPiece !== null) {
    if(move.destinationPiece === 'knight') {
      res += 'N';
    }
    else {
      res += move.destinationPiece.charAt(0).toUpperCase();
    }
  }
  res += sanCoord(move.destinationPosition.slice(2)).str;

  return res;
}

const notationGetNotationFromAction = (gameState, action, expanded = true) => {
  var res = '';
  for(var i = 0;i < action.length;i++) {
    res += notationGetNotationFromMove(gameState, action[i], expanded) + '\n';
  }
  return res;
}

const sanCoord = (input) => {
  var res = {
    str: '',
    arr: [0,0]
  };
  if(typeof input === 'string') {
    res.str = input;
    res.arr[0] = input.charCodeAt(0) - 97;
    res.arr[1] = 8 - Number(input.charAt(1));
  }
  else if(Array.isArray(input)) {
    res.str = String.fromCharCode(input[0] + 97) + (8 - input[1]);
    res.arr = input;
  }
  return res;
}

exports.notationGetNotationFromMove = notationGetNotationFromMove;
exports.notationGetNotationFromAction = notationGetNotationFromAction;
