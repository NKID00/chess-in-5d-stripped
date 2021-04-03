import Chess from '5d-chess-js';

var chess = new Chess();

export const inCheckmate = (state) => {
  chess.state(state);
  chess.checkmateTimeout = 7500;
  return chess.inCheckmate;
};
