import Chess from '5d-chess-js';

var chess = new Chess();
chess.checkmateTimeout = 10000;

export const metadata = (metadata = {}) => {
  console.log(chess.rawAction)
  Object.assign(chess.metadata, metadata);
  return chess.metadata;
};

export const variant = (variant) => {
  chess.metadata.variant = variant;
  return chess.reset(variant);
};

export const reset = () => {
  return chess.reset();
};

export const convert = (input) => {
  return chess.convert(input);
};

export const convertable = (input) => {
  return chess.convertable(input);
};

export const importFunc = (input, variant = undefined, skipDetection = true) => {
  return chess.import(input, variant, skipDetection);
};

export const importable = (input, skipDetection = true) => {
  return chess.importable(input, skipDetection);
};

export const action = (input, skipDetection = false) => {
  return chess.action(input, skipDetection);
};

export const actions = (format = 'object', activeOnly = true, presentOnly = true, newActiveTimelinesOnly = true, skipDetection = false) => {
  return chess.actions(format, activeOnly, presentOnly, newActiveTimelinesOnly, skipDetection);
};

export const actionable = (input, skipDetection = false) => {
  return chess.actionable(input, skipDetection);
};

export const move = (input, skipDetection = true) => {
  return chess.move(input, skipDetection);
};

export const moves = (format = 'object', activeOnly = true, presentOnly = true, skipDetection = false) => {
  return chess.moves(format, activeOnly, presentOnly, skipDetection);
};

export const moveable = (input, skipDetection = true, moveGen = []) => {
  return chess.moveable(input, skipDetection, moveGen);
};

export const submit = (skipDetection = true) => {
  return chess.submit(skipDetection);
};

export const submittable = (skipDetection = true) => {
  return chess.submittable(skipDetection);
};

export const undo = () => {
  return chess.undo();
};

export const undoable = () => {
  return chess.undoable();
};

export const checks = (format = 'object') => {
  return chess.checks(format);
};

export const inCheckmate = () => {
  return chess.inCheckmate;
};

export const inCheck = () => {
  return chess.inCheck;
};

export const inStalemate = () => {
  return chess.inStalemate;
};

export const exportFunc = (format = 'notation') => {
  return chess.export(format);
};

export const board = () => {
  return chess.board;
};

export const actionNumber = () => {
  return chess.actionNumber;
};

export const boardHistory = () => {
  return chess.actionHistory;
};

export const actionHistory = () => {
  return chess.actionHistory;
};

export const moveBuffer = () => {
  return chess.moveBuffer;
};

export const player = () => {
  return chess.player;
};
