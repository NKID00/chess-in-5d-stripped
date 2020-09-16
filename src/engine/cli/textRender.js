const deepcopy = require('deep-copy');
const chalk = require('chalk');

const createBoardStrArr = (turn, utfChar = false, invertColor = false) => {
  var res = [];
  var pieces = deepcopy(turn.pieces);
  for(var y = 0;y < 10;y++) {
    res.push([]);
    for(var x = 0;x < 10;x++) {
      if(y === 0) {
        if(x === 0) {
          res[y].push(invertColor === (turn.playerTurn === 'white') ? '' + chalk.inverse('╔') : '╔');
        }
        else if(x === 9) {
          res[y].push(invertColor === (turn.playerTurn === 'white') ? '' + chalk.inverse('╗') : '╗');
        }
        else {
          res[y].push(invertColor === (turn.playerTurn === 'white') ? '' + chalk.inverse('═') : '═');
        }
      }
      else if(y === 9) {
        if(x === 0) {
          res[y].push(invertColor === (turn.playerTurn === 'white') ? '' + chalk.inverse('╚') : '╚');
        }
        else if(x === 9) {
          res[y].push(invertColor === (turn.playerTurn === 'white') ? '' + chalk.inverse('╝') : '╝');
        }
        else {
          res[y].push(invertColor === (turn.playerTurn === 'white') ? '' + chalk.inverse('═') : '═');
        }
      }
      else if(x === 0) {
        res[y].push(invertColor === (turn.playerTurn === 'white') ? '' + chalk.inverse('║') : '║');
      }
      else if(x === 9) {
        res[y].push(invertColor === (turn.playerTurn === 'white') ? '' + chalk.inverse('║') : '║');
      }
      else {
        res[y].push(' ');
      }
    }
  }
  for(var i = 0;i < pieces.length;i++) {
    var org = res[pieces[i].position[1] + 1][pieces[i].position[0] + 1];
    if(pieces[i].type === 'pawn') {
      res[pieces[i].position[1] + 1][pieces[i].position[0] + 1] = (pieces[i].player === 'white' ? '♙' : '♟');
      if(!utfChar) {
        res[pieces[i].position[1] + 1][pieces[i].position[0] + 1] = (pieces[i].player === 'white' ? 'P' : 'p');
      }
    }
    if(pieces[i].type === 'bishop') {
      res[pieces[i].position[1] + 1][pieces[i].position[0] + 1] = (pieces[i].player === 'white' ? '♗' : '♝');
      if(!utfChar) {
        res[pieces[i].position[1] + 1][pieces[i].position[0] + 1] = (pieces[i].player === 'white' ? 'B' : 'b');
      }
    }
    if(pieces[i].type === 'knight') {
      res[pieces[i].position[1] + 1][pieces[i].position[0] + 1] = (pieces[i].player === 'white' ? '♘' : '♞');
      if(!utfChar) {
        res[pieces[i].position[1] + 1][pieces[i].position[0] + 1] = (pieces[i].player === 'white' ? 'N' : 'n');
      }
    }
    if(pieces[i].type === 'rook') {
      res[pieces[i].position[1] + 1][pieces[i].position[0] + 1] = (pieces[i].player === 'white' ? '♖' : '♜');
      if(!utfChar) {
        res[pieces[i].position[1] + 1][pieces[i].position[0] + 1] = (pieces[i].player === 'white' ? 'R' : 'r');
      }
    }
    if(pieces[i].type === 'queen') {
      res[pieces[i].position[1] + 1][pieces[i].position[0] + 1] = (pieces[i].player === 'white' ? '♕' : '♛');
      if(!utfChar) {
        res[pieces[i].position[1] + 1][pieces[i].position[0] + 1] = (pieces[i].player === 'white' ? 'Q' : 'q');
      }
    }
    if(pieces[i].type === 'king') {
      res[pieces[i].position[1] + 1][pieces[i].position[0] + 1] = (pieces[i].player === 'white' ? '♔' : '♚');
      if(!utfChar) {
        res[pieces[i].position[1] + 1][pieces[i].position[0] + 1] = (pieces[i].player === 'white' ? 'K' : 'k');
      }
    }
  }
  for(var y = 1;y < 9;y++) {
    for(var x = 1;x < 9;x++) {
      if(invertColor === ((x + y) % 2 === 0)) {
        res[y][x] = chalk.inverse(res[y][x]);
      }
    }
  }
  return res;
}

const createBlankStrArr = () => {
  var res = [];
  for(var y = 0;y < 10;y++) {
    res.push([]);
    for(var x = 0;x < 10;x++) {
      res[y].push(' ');
    }
  }
  return res;
}

const createStateStrArr = (gameState, utfChar = false, invertColor = false) => {
  var res = [];
  var minTimeline = 0;
  var maxTimeline = 0;
  var maxTurn = 0;
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
  for(var l = minTimeline;l <= maxTimeline;l++) {
    res.push([]);
    for(var t = 1;t <= maxTurn;t++) {
      res[l - minTimeline].push(createBlankStrArr());
      res[l - minTimeline].push(createBlankStrArr());
    }
  }
  for(var i = 0;i < gameState.timelines.length;i++) {
    for(var j = 0;j < gameState.timelines[i].turns.length;j++) {
      if(gameState.timelines[i].turns[j].playerTurn === 'white') {
        res[gameState.timelines[i].timeline - minTimeline][(gameState.timelines[i].turns[j].turn - 1) * 2] = createBoardStrArr(gameState.timelines[i].turns[j], utfChar, invertColor);
      }
      else {
        res[gameState.timelines[i].timeline - minTimeline][(gameState.timelines[i].turns[j].turn - 1) * 2 + 1] = createBoardStrArr(gameState.timelines[i].turns[j], utfChar, invertColor);
      }
    }
  }
  return res;
}

const printBoardArr = (arr) => {
  var args = '';
  for(var y = 0;y < arr.length;y++) {
    for(var x = 0;x < arr[y].length;x++) {
      args += arr[y][x];
    }
    args += '\n';
  }
  console.log(args);
}

const printStateArr = (arr) => {
  var args = '';
  for(var l = 0;l < arr.length;l++) {
    for(var y = 0;y < 10;y++) {
      for(var t = 0;t < arr[l].length;t++) {
        for(var x = 0;x < 10;x++) {
          args += arr[l][t][y][x];
        }
      }
      args += '\n';
    }
  }
  console.log(args);
}

exports.createBoardStrArr = createBoardStrArr;
exports.createStateStrArr = createStateStrArr;
exports.printBoardArr = printBoardArr;
exports.printStateArr = printStateArr;
