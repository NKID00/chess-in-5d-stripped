const deepmerge = require('deepmerge');
const store = require('store');

var collections = require('network/db').init();

const defaultTexture = {
  highlight: null,
  whiteSquare: null,
  blackSquare: null,
  whiteBoardBorder: null,
  blackBoardBorder: null,
  checkBoardBorder: null,
  inactiveBoardBorder: null,
  blackP: null,
  blackW: null,
  blackB: null,
  blackN: null,
  blackR: null,
  blackS: null,
  blackQ: null,
  blackK: null,
  whiteP: null,
  whiteW: null,
  whiteB: null,
  whiteN: null,
  whiteR: null,
  whiteS: null,
  whiteQ: null,
  whiteK: null,
};

export const set = (texture, emitter = null) => {
  store.set('texture', deepmerge(store.get('texture'), texture));
  if(emitter !== null) {
    emitter.emit('textureUpdate');
  }
}

export const get = () => {
  var storedTexture = store.get('texture');
  if(typeof storedTexture === 'object') {
    return deepmerge(defaultTexture, storedTexture);
  }
  return defaultTexture;
}