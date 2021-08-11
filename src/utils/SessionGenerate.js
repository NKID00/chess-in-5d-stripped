import Chess from '5d-chess-js';
import ChessClock from '5d-chess-clock';

export const generate = (variant = 'standard', format = null) => {
  let res = {
    id: String(Date.now()),
    white: '',
    black: '',
    variant: variant,
    format: null,
    ranked: false,
    offerDraw: false,
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
  //Setup chess board
  let chess = new Chess();
  if(variant.includes('[')) {
    chess.import(variant);
  }
  else {
    chess.reset(variant);
  }
  res.board = chess.board;
  //Setup chess clock
  let chessClock = new ChessClock();
  if(format !== null) {
    chessClock.import(format);
    chessClock.start(res.board, res.startDate);
    res.format = chessClock.format;
    res.timed = chessClock.state();
  }
  return res;
}