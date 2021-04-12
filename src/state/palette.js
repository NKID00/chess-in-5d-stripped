const deepmerge = require('deepmerge');
const store = require('store');

const defaultPalette = {
  background: {
    single: 0xE2E5F7,
    lightRectangle: 0xE2E5F7,
    lightStripeBlack: 0xBCB6CE,
    lightStripeWhite: 0xE5EEF6,
    darkRectangle: 0xCED4F1,
    darkStripeBlack: 0xAFA3BD,
    darkStripeWhite: 0xDDE5F4,
  },
  board: {
    whiteBorder: 0xdddddd,
    blackBorder: 0x222222,
    checkBorder: 0xc50000,
    inactiveBorder: 0x777777,
    whiteBorderOutline: 0x222222,
    blackBorderOutline: 0xdddddd,
    checkBorderOutline: 0xaf0000,
    inactiveBorderOutline: 0x777777,
  },
  boardLabel: {
    timeline: 0x000000,
    turn: 0x000000,
    whiteBoard: 0x000000,
    blackBoard: 0xffffff,
    checkBoard: 0xffffff,
    inactiveBoard: 0xffffff,
  },
  boardShadow: {
    shadow: 0x000000,
  },
  square: {
    white: 0xaaaaaa,
    black: 0x555555,
  },
  arrow: {
    move: 0xd3a026,
    moveOutline: 0x000000,
    check: 0xf50000,
    checkOutline: 0x000000,
    custom: 0x32dcfa,
    customOutline: 0x000000,
    custom1: 0xd3a026,
    custom1Outline: 0x000000,
    custom2: 0x0dd95b,
    custom2Outline: 0x000000,
    custom3: 0x32dcfa,
    custom3Outline: 0x000000,
    custom4: 0xf50000,
    custom4Outline: 0x000000,
  },
  highlight: {
    self: 0x0083be,
    move: 0x6fc326,
    pastMove: 0x6fc326,
    capture: 0xf50000,
    pastCapture: 0xf50000,
  }
};

export const set = (palette, emitter = null) => {
  store.set('palette', deepmerge(store.get('palette'), palette));
  if(emitter !== null) {
    emitter.emit('paletteUpdate');
  }
}

export const get = () => {
  var storedPalette = store.get('palette');
  if(typeof storedPalette === 'object') {
    return deepmerge(defaultPalette, storedPalette);
  }
  return defaultPalette;
}