import Chess from '5d-chess-js';

export const fromServerGame = (game) => {
  let res = {
    id: game.id,
    host: null,
    white: game.white,
    black: game.black,
    variant: game.variant,
    format: game.format,
    ranked: game.ranked,
    started: true,
    startDate: game.startDate,
    ended: true,
    endDate: game.endDate,
    processing: false,
    timed: null,
    actionHistory: game.actionHistory,
    moveBuffer: [],
    comments: [],
    metadata: [],
    player: null,
    winner: game.winner,
    winCause: game.winCause,
  };
  
  try {
    let chess = new Chess();
    if(game.variant.includes('[')) {
      chess.import(game.variant);
      for(let i = 0;i < game.actionHistory.length;i++) {
        chess.action(game.actionHistory[i]);
      }
    }
    else {
      chess.import(game.actionHistory, game.variant);
    }
    res.board = chess.board;
  }
  catch(err) {}
  return res;
}