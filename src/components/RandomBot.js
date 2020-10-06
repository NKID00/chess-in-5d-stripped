const BotFunc = (Chess, chessInstance) => {
  var action = {
    action: chessInstance.actionNumber,
    player: chessInstance.player,
    moves: []
  };
  var actionMoves = [];
  var valid = false;
  while(!valid) {
    actionMoves = [];
    var submit = false;
    var tmpChess = new Chess(chessInstance.export());
    while(!submit) {
      var moves = tmpChess.moves('object', true, true, true);
      if(moves.length > 0) {
        var move = moves[Math.floor(Math.random() * moves.length)];
        actionMoves.push(move);
        tmpChess.move(move);
      }
      else {
        submit = true;
      }
    }
    if(!tmpChess.inCheck) {
      valid = true;
    }
  }
  action.moves = actionMoves;
  console.log('Random Bot is making action:\n' + JSON.stringify(action));
  return action;
}

export default BotFunc;
