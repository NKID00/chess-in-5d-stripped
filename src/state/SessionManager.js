import Chess from '5d-chess-js';
import ChessClock from '5d-chess-clock';
import { createNanoEvents } from 'nanoevents';

import * as authStore from 'state/auth';
import * as sessions from 'network/sessions';

const collections = require('state/db').init();

export default class SessionManager {
  constructor(id = null) {
    this.emitter = createNanoEvents();
    if(id) {
      this.init(id);
    }
  }
  async init(id) {
    this.canPlay = true;
    this.session = await sessions.getCurrentSession(id);
    if(this.session === null) {
      this.canPlay = false;
      this.session = await sessions.getSession(id);
    }
    this.isServer = typeof this.session.host !== 'undefined';
    this.pastAvailableMoves = [];
    this.futureAvailableMoves = [];
    this.chess = new Chess();
    this.chess.skipDetection = true;
    this.chessClock = new ChessClock();
    this.reset();
    this.emitter.emit('onBoardUpdate', this.getBoard());
    this.emitter.emit('onClockUpdate', this.getClock());
    if(this.session.ended) {
      await this.endSession();
    }
    else {
      this.allowUpdate = true;
      this.updateInterval();
    }
  }
  async updateInterval() {
    let slowChecking = true;
    if(this.canPlay) {
      this.session = await sessions.getCurrentSession(this.session.id);
    }
    else {
      this.session = await sessions.getSession(this.session.id);
    }
    if(this.isServer) {
      //Check if session is current player
      let username = authStore.get().username;
      if(
        (this.session.player === 'white' && this.session.white !== username) ||
        (this.session.player === 'black' && this.session.black !== username)
      ) {
        slowChecking = false;
      }
      if(this.session.timed !== null) {
        this.chessClock.state(this.session.timed);
      }
      let needUpdate = false;
      let needReset = false;
      //Checking action history for update
      if(this.session.actionHistory.length > this.chess.actionHistory.length) {
        for(let i = this.chess.actionHistory.length;!needReset && i < this.session.actionHistory.length;i++) {
          let moves = this.chess.moves('object', false, false, false);
          for(let move of moves) {
            this.pastAvailableMoves.push(move);
          }
          try {
            this.chess.action(this.session.actionHistory[i]);
          }
          catch(err) {
            needReset = true;
          }
        }
        //Populate futureAvailableMoves
        let tmpChess = this.chess.copy();
        tmpChess.skipDetection = true;
        tmpChess.pass();
        this.futureAvailableMoves = tmpChess.moves('object', false, false, false);
        needUpdate = true;
      }
      if(this.session.actionHistory.length < this.chess.actionHistory.length) {
        needReset = true;
        needUpdate = true;
      }
      //Checking move buffer for update
      if(this.session.moveBuffer.length > this.chess.moveBuffer.length) {
        for(let i = this.chess.moveBuffer.length;!needReset && i < this.session.moveBuffer.length;i++) {
          try {
            this.chess.move(this.session.moveBuffer[i]);
          }
          catch(err) {
            needReset = true;
          }
        }
        needUpdate = true;
      }
      if(this.session.moveBuffer.length < this.chess.moveBuffer.length) {
        for(let i = this.chess.moveBuffer.length;!needReset && i < this.session.moveBuffer.length;i++) {
          try {
            this.chess.undo();
          }
          catch(err) {
            needReset = true;
          }
        }
        needUpdate = true;
      }
      //Update if needed
      if(needReset) {
        this.reset();
      }
      if(needUpdate) {
        this.emitter.emit('onBoardUpdate', this.getBoard());
      }
    }
    let chessClockState = this.chessClock.state();
    if(chessClockState.running) {
      this.emitter.emit('onClockUpdate', this.getClock());
      //Update every 100ms if current player has less than 1 second
      if(
        (chessClockState.whiteDurationLeft < 60000 && this.chess.player === 'white') ||
        (chessClockState.blackDurationLeft < 60000 && this.chess.player === 'black')
      ) {
        slowChecking = false;
      }
    }
    else {
      if(!this.isServer && chessClockState.lastUpdate >= 0) {
        if(chessClockState.whiteDurationLeft <= 0) {
          await this.setSession();
          this.session.winner = 'black';
          this.session.winCause = 'time';
          this.session.ended = true;
          this.session.endDate = Date.now();
          this.endSession();
        }
        if(chessClockState.blackDurationLeft <= 0) {
          await this.setSession();
          this.session.winner = 'white';
          this.session.winCause = 'time';
          this.session.ended = true;
          this.session.endDate = Date.now();
          this.endSession();
        }
      }
    }
    if(this.allowUpdate && !this.session.ended) {
      if(slowChecking) {
        this.updateIntervalHandler = window.setTimeout(this.updateInterval.bind(this), 3000);
      }
      else {
        this.updateIntervalHandler = window.setTimeout(this.updateInterval.bind(this), 750);
      }
    }
  }
  reset() {
    //Initialize clock if needed
    if(this.session.timed !== null) {
      this.chessClock.state(this.session.timed);
    }
    //Initialize chess board with variant
    if(this.session.variant.includes('[')) {
      this.chess.import(this.session.variant);
    }
    else {
      this.chess.reset(this.session.variant);
    }
    //Import action history
    for(let i = 0;i < this.session.actionHistory.length;i++) {
      let moves = this.chess.moves('object', false, false, false);
      for(let move of moves) {
        this.pastAvailableMoves.push(move);
      }
      this.chess.action(this.session.actionHistory[i]);
    }
    //Import move buffer
    for(let i = 0;i < this.session.moveBuffer.length;i++) {
      this.chess.move(this.session.moveBuffer);
    }
    //Populate futureAvailableMoves
    let tmpChess = this.chess.copy();
    tmpChess.skipDetection = true;
    tmpChess.pass();
    this.futureAvailableMoves = tmpChess.moves('object', false, false, false);
  }
  async setSession() {
    if(!this.isServer) {
      this.session.board = this.chess.board;
      this.session.actionHistory = this.chess.actionHistory;
      this.session.moveBuffer = this.chess.moveBuffer;
      this.session.player = this.chess.player;
      if(this.session.timed !== null) {
        this.session.timed = this.chessClock.state();
      }
      if(this.session._id) {
        delete this.session._id;
      }
      await collections.currentSessions.update({ id: this.session.id }, { $set: this.session }, { upsert: true });
    }
  }
  async endSession() {
    if(this.session._id) {
      delete this.session._id;
    }
    await collections.pastSessions.update({ id: this.session.id }, { $set: this.session }, { upsert: true });
    try {
      await collections.currentSessions.remove({ id: this.session.id });
    }
    catch(err) {}
    this.emitter.emit('onEnd', {
      isCheckmate: (this.session.winner === 'white' || this.session.winner === 'black') && this.session.winCause === 'regular',
      isFlagged: (this.session.winner === 'white' || this.session.winner === 'black') && this.session.winCause === 'time',
      isForfeit: (this.session.winner === 'white' || this.session.winner === 'black') && this.session.winCause === 'forfeit',
      isStalemate: this.session.winner === 'draw' && this.session.winCause === 'regular',
      isDraw: this.session.winner === 'draw' && this.session.winCause === 'forfeit',
    });
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
      undoable: this.chess.undoable(),
      submittable: this.chess.submittable(),
      notation: this.chess.export('5dpgn_active_timeline')
    };
  }
  getClock() {
    return this.chessClock.state();
  }
  on(event, callback) {
    //onBoardUpdate
    //onClockUpdate
    //onEnd
    return this.emitter.on(event, callback);
  }
  async move(move) {
    if(this.canPlay) {
      if(this.isServer) {
        //TODO network play
      }
      else {
        this.chess.move(move);
        await this.setSession();
        this.emitter.emit('onBoardUpdate', this.getBoard());
      }
    }
  }
  async undo() {
    if(this.canPlay) {
      if(this.isServer) {
        //TODO network play
      }
      else {
        this.chess.undo();
        await this.setSession();
        this.emitter.emit('onBoardUpdate', this.getBoard());
      }
    }
  }
  async submit() {
    if(this.canPlay) {
      if(this.isServer) {
        //TODO network play
      }
      else {
        this.chessClock.stop();
        this.chess.submit();
        this.chessClock.start();
        this.chessClock.switch(this.chess.player, this.chess.board);
        await this.setSession();
        this.emitter.emit('onBoardUpdate', this.getBoard());
      }
    }
  }
  async forfeit() {
    if(this.canPlay) {
      if(this.isServer) {
        //TODO network play
      }
      else {
        this.session.winner = this.chess.player === 'white' ? 'black' : 'white';
        this.session.winCause = 'forfeit';
        this.session.ended = true;
        this.session.endDate = Date.now();
        this.endSession();
      }
    }
  }
  async draw() {
    if(this.canPlay) {
      if(this.isServer) {
        //TODO network play
      }
      else {
        this.session.winner = 'draw';
        this.session.winCause = 'forfeit';
        this.session.ended = true;
        this.session.endDate = Date.now();
        this.endSession();
      }
    }
  }
  destroy() {
    this.emitter.events = {};
    window.clearTimeout(this.updateIntervalHandler);
    this.allowUpdate = false;
  }
}