import { createNanoEvents } from 'nanoevents';

export class SessionManager {
  constructor() {
    this.emitter = createNanoEvents();
  }
  on(event, callback) {
    //onBoardUpdate
    //onClockUpdate
    //onEnd
    return this.emitter.on(event, callback);
  }
  move() {
    //TODO
  }
  undo() {
    //TODO
  }
  submit() {
    //TODO
  }
  forfeit() {
    //TODO
  }
  draw() {
    //TODO
  }
  destroy() {
    this.emitter.events = {};
  }
}
