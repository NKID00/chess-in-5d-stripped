const deepmerge = require('deepmerge');
const store = require('store');

const defaultHotkeys = {
  undo: 'Z, Ctrl+ArrowLeft, Backspace',
  submit: 'F, Ctrl+ArrowRight, Enter',
  restore: 'R',
  previousAction: 'Shift+ArrowLeft',
  previousMove: 'ArrowLeft',
  nextMove: 'ArrowRight',
  nextAction: 'Shift+ArrowRight',
};

export const set = (hotkeys, emitter = null) => {
  store.set('hotkeys', deepmerge(store.get('hotkeys'), hotkeys));
  if(emitter !== null) {
    emitter.emit('hotkeysUpdate');
  }
}

export const get = () => {
  var storedHotkeys = store.get('hotkeys');
  if(typeof storedHotkeys === 'object' && storedHotkeys !== null) {
    return deepmerge(defaultHotkeys, storedHotkeys);
  }
  return defaultHotkeys;
}

export const reset = (emitter = null) => {
  store.set('hotkeys', defaultHotkeys);
  if(emitter !== null) {
    emitter.emit('hotkeysUpdate');
  }
}