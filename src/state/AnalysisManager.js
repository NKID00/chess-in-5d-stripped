import Chess from '5d-chess-js';
import { createNanoEvents } from 'nanoevents';

import * as sessions from 'network/sessions';
import * as LinkCompression from 'utils/LinkCompression';

const deepcopy = require('deepcopy');

export default class AnalysisManager {
  constructor(id = null) {
    this.emitter = createNanoEvents();
    if(id) {
      this.init(id);
    }
  }
  async init(id, emptyBase = false) {
    //Import session if available
    this.importB64 = '';
    this.session = await sessions.getSession(id);
    if(this.session === null) {
      try {
        let pastSessions = await sessions.getPastSessionsQuery({ id: id });
        if(pastSessions.length > 0) {
          this.session = pastSessions[0];
          this.emitter.emit('onSessionUpdate', this.session);
        }
        else {
          //No session available, assuming id is Base64 import
          this.importB64 = id;
        }
      }
      catch(err) {
        this.importB64 = id;
      }
    }
    else {
      this.emitter.emit('onSessionUpdate', this.session);
    }
    this.pastAvailableMoves = [];
    this.futureAvailableMoves = [];
    this.currentActionHistory = [];
    this.currentMoveBuffer = [];
    this.baseActionHistory = [];
    this.baseMoveBuffer = [];
    this.baseNotation = '';
    this.emptyBase = emptyBase;
    this.chess = new Chess();
    this.chess.skipDetection = true;
    this.reset();
    //TODO used for debugging
    window.chess = this.chess;
    window.chessClock = this.chessClock;
  }
  reset() {
    //If session based
    if(this.session !== null) {
      //Initialize chess board with variant
      if(this.session.variant.includes('[')) {
        this.chess.import(this.session.variant);
        this.chess.reset();
      }
      else {
        this.chess.reset(this.session.variant);
      }
      this.currentActionHistory = deepcopy(this.session.actionHistory);
      this.currentMoveBuffer = deepcopy(this.session.moveBuffer);
    }
    else {
      let importStr = LinkCompression.decompressLink(this.importB64);
      let tmpChess = new Chess();
      tmpChess.import(importStr);
      this.chess.state(tmpChess.state());
      this.currentActionHistory = tmpChess.actionHistory;
      this.currentMoveBuffer = tmpChess.moveBuffer;
    }
    this.baseActionHistory = deepcopy(this.currentActionHistory);
    this.baseMoveBuffer = deepcopy(this.currentMoveBuffer);
    this.setCurrentState(false);
    this.baseNotation = this.chess.export('5dpgn_active_timeline');
    this.emitter.emit('onBoardUpdate', this.getBoard());
  }
  setCurrentState(emit = true) {
    this.chess.reset();
    //Import action history
    this.pastAvailableMoves = [];
    for(let i = 0;i < this.currentActionHistory.length;i++) {
      let moves = this.chess.moves('object', false, false, false);
      for(let move of moves) {
        this.pastAvailableMoves.push(move);
      }
      for(let j = 0;j < this.currentActionHistory[i].moves.length;j++) {
        this.chess.move(this.currentActionHistory[i].moves[j]);
      }
      this.chess.submit();
    }
    //Import move buffer
    for(let i = 0;i < this.currentMoveBuffer.length;i++) {
      this.chess.move(this.currentMoveBuffer[i]);
    }
    //Populate futureAvailableMoves
    try {
      let tmpChess = this.chess.copy();
      tmpChess.skipDetection = true;
      tmpChess.pass();
      this.futureAvailableMoves = tmpChess.moves('object', false, false, false);
    }
    catch(err) {}
    if(emit) {
      this.emitter.emit('onBoardUpdate', this.getBoard());
    }
  }
  getBoard() {
    let currentNotation = this.chess.export('5dpgn_active_timeline');
    return {
      player: this.chess.player,
      board: this.chess.board,
      actionHistory: this.chess.actionHistory,
      moveBuffer: this.chess.moveBuffer,
      checks: this.chess.checks(),
      availableMoves: this.chess.moves('object', false, false, false),
      pastAvailableMoves: [this.pastAvailableMoves,this.futureAvailableMoves].flat(),
      undoable: this.chess.undoable() && ((this.isServer && this.isPlayer) || !this.isServer),
      submittable: this.chess.submittable() && ((this.isServer && this.isPlayer) || !this.isServer),
      notation: currentNotation,
      baseNotation: this.baseNotation.includes(currentNotation) ? this.baseNotation : currentNotation
    };
  }
  on(event, callback) {
    //onBoardUpdate
    //onSessionUpdate
    return this.emitter.on(event, callback);
  }
  setAsBase() {
    this.baseActionHistory = deepcopy(this.currentActionHistory);
    this.baseMoveBuffer = deepcopy(this.currentMoveBuffer);
    this.baseNotation = this.chess.export('5dpgn_active_timeline');
    if(this.emptyBase) {
      this.importB64 = LinkCompression.compressLink(this.baseNotation);
    }
  }
  move(move) {
    this.chess.move(move);
    this.currentActionHistory = deepcopy(this.chess.actionHistory);
    this.currentMoveBuffer = deepcopy(this.chess.moveBuffer);
    this.setAsBase();
    this.setCurrentState();
  }
  undo() {
    this.chess.undo();
    this.currentActionHistory = deepcopy(this.chess.actionHistory);
    this.currentMoveBuffer = deepcopy(this.chess.moveBuffer);
    this.setAsBase();
    this.setCurrentState();
  }
  submit() {
    this.chess.submit();
    this.currentActionHistory = deepcopy(this.chess.actionHistory);
    this.currentMoveBuffer = deepcopy(this.chess.moveBuffer);
    this.setAsBase();
    this.setCurrentState();
  }
  previousAction() {
    if(this.currentMoveBuffer.length > 0) {
      this.currentMoveBuffer = [];
      this.setCurrentState();
    }
    else if(this.currentActionHistory.length > 0) {
      this.currentActionHistory.pop();
      this.setCurrentState();
    }
  }
  nextAction() {
    if(this.currentActionHistory.length < this.baseActionHistory.length) {
      this.currentActionHistory.push(deepcopy(this.baseActionHistory[this.currentActionHistory.length]));
      this.currentMoveBuffer = [];
      this.setCurrentState();
    }
  }
  previousMove() {
    if(this.currentActionHistory.length > 0) {
      if(this.currentMoveBuffer.length <= 0) {
        this.currentMoveBuffer = deepcopy(this.currentActionHistory.pop().moves);
      }
      this.currentMoveBuffer.pop();
      this.setCurrentState();
    }
  }
  nextMove() {
    if(this.currentMoveBuffer.length < this.baseMoveBuffer.length) {
      this.currentMoveBuffer.push(deepcopy(this.baseMoveBuffer[this.currentMoveBuffer.length]));
      this.setCurrentState();
    }
    else {
      this.nextAction();
    }
  }
  select(notation) {
    let tmpChess = new Chess();
    tmpChess.import(notation);
    this.currentActionHistory = tmpChess.actionHistory;
    this.currentMoveBuffer = tmpChess.moveBuffer;
    this.setCurrentState();
  }
  destroy() {
    this.emitter.events = {};
  }
}