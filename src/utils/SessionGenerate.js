import Chess from '5d-chess-js';

export const generate = (variant = 'standard', format = 'untimed') => {
  let res = {
    id: String(Date.now()),
    white: '',
    black: '',
    variant: variant,
    format: format,
    ranked: false,
    started: true,
    startDate: Date.now(),
    ended: false,
    endDate: null,
    processing: false,
    timed: null,
    actionHistory: [],
    moveBuffer: [],
    comments: [],
    metadata: [],
    player: null,
    winner: null,
    winCause: null,
  };
  
  try {
    let chess = new Chess();
    if(variant.includes('[')) {
      chess.import(variant);
    }
    else {
      chess.reset(variant);
    }
    res.board = chess.board;
  }
  catch(err) {}
  return res;
}