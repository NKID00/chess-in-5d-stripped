const store = require('store');

var defaultPalette = {
  background: 0x000000,
  whiteSquare: 0xaaaaaa,
  blackSquare: 0x555555,
  selectedPiece: 0x0083be,
  moveArrow: 0xd3a026,
  moveHighlight: 0x6fc326,
  captureHighlight: 0xf50000,
  checkArrow: 0xf50000,
  whiteBoardOutline: 0xdddddd,
  blackBoardOutline: 0x222222,
  checkBoardOutline: 0xf50000,
  inactiveBoardOutline: 0x777777,
  timelineLabel: 0xffffff,
  turnLabel: 0xffffff,
  whiteBoardLabel: 0x000000,
  blackBoardLabel: 0xffffff,
  checkBoardLabel: 0xffffff
};

const reset = () => { store.clearAll(); }

const resetPalette = () => {
  store.set('palette', defaultPalette);
};

const get = (str) => {
  var res = store.get(str);
  var defaultObj = {};
  if(str === 'server') {
    defaultObj = {
      url: 'server.chessin5d.net',
      key: 'ff104801-d3da-49b5-ae3c-11a3198f6c22'
    };
  }
  else if(str === 'peerjs') {
    defaultObj = {
      host: 'peer.chessin5d.net',
      port: 8000,
      path: '/',
      secure: true
    };
  }
  else if(str === 'palette') {
    defaultObj = defaultPalette;
  }
  else if(str === 'name') {
    defaultObj = {
      username: 'Player ' + Math.round(Math.random() * 9999).toFixed()
    };
  }
  else if(str === 'sound') {
    defaultObj = {
      ambience: 0.5,
      music: 0.5,
      effect: 0.5
    };
  }
  if(res) {
    res = Object.assign(defaultObj, res);
  }
  else {
    res = defaultObj;
  }
  store.set(str, res);
  return res;
};

const set = (str, data) => {
  store.set(str, data);
};

export default {
  reset: reset,
  resetPalette: resetPalette,
  get: get,
  set: set
};
