import Chess from '5d-chess-js';
import { createNanoEvents } from 'nanoevents';

import * as sessions from 'network/sessions';
import * as LinkCompression from 'utils/LinkCompression';

const collections = require('state/db').init();
const deepcopy = require('deepcopy');

export default class SessionManager {
  constructor(id = null) {
    this.emitter = createNanoEvents();
    if(id) {
      this.init(id);
    }
  }
  async init(id) {
    //Import session if available
    this.importB64 = '';
    this.session = await sessions.getSession(id);
    if(this.session === null) {
      let pastSessions = await sessions.getPastSessionsQuery({ id: id });
      if(pastSessions.length > 0) {
        this.session = pastSessions[0];
      }
      else {
        //No session available, assuming id is Base64 import
        this.importB64 = id;
      }
    }
    this.pastAvailableMoves = [];
    this.futureAvailableMoves = [];
    this.currentActionHistory = [];
    this.currentMoveBuffer = [];
    this.chess = new Chess();
    this.chess.skipDetection = true;
    this.emitter.emit('onBoardUpdate', this.getBoard());
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
    this.setCurrentState();
  }
  setCurrentState() {
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
    let tmpChess = this.chess.copy();
    tmpChess.skipDetection = true;
    tmpChess.pass();
    this.futureAvailableMoves = tmpChess.moves('object', false, false, false);
  }
  getBoard() {
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
      notation: this.chess.export('5dpgn_active_timeline')
    };
  }
  on(event, callback) {
    //onBoardUpdate
    //onClockUpdate
    //onEnd
    return this.emitter.on(event, callback);
  }
  move(move) {
    this.chess.move(move);
    this.currentActionHistory = this.chess.actionHistory;
    this.currentMoveBuffer = this.chess.moveBuffer;
    this.setCurrentState();
    this.emitter.emit('onBoardUpdate', this.getBoard());
  }
  undo() {
    this.chess.undo(move);
    this.currentActionHistory = this.chess.actionHistory;
    this.currentMoveBuffer = this.chess.moveBuffer;
    this.setCurrentState();
    this.emitter.emit('onBoardUpdate', this.getBoard());
  }
  submit() {
    this.chess.submit();
    this.currentActionHistory = this.chess.actionHistory;
    this.currentMoveBuffer = this.chess.moveBuffer;
    this.setCurrentState();
    this.emitter.emit('onBoardUpdate', this.getBoard());
  }
}