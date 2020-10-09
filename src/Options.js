const store = require('store');

const reset = () => { store.clearAll(); }
const get = (str) => {
  var res = store.get(str);
  var defaultObj = {};
  if(str === 'peerjs') {
    defaultObj = {
      host: 'peer.chessin5d.net',
      port: 8000,
      path: '/',
      secure: true
    };
  }
  else if(str === 'palette') {
    defaultObj = {
      background: 0x000000,
      whiteSquare: 0xaaaaaa,
      blackSquare: 0x555555,
      selectedPiece: 0x0000ff,
      moveArrow: 0x00aa00,
      moveHighlight: 0x00ff00,
      captureArrow: 0xaa0000,
      captureHighlight: 0xff0000,
      checkArrow: 0xaa0000,
      checkSourceHighlight: 0xff0000,
      checkDestinationHighlight: 0xff0000,
      whiteBoardOutline: 0xdddddd,
      blackBoardOutline: 0x222222,
      checkBoardOutline: 0xff0000,
      inactiveBoardOutline: 0x777777,
      whiteArrowOutline: 0xffffff,
      blackArrowOutline: 0x000000
    };
  }
  else if(str === 'name') {
    defaultObj = {
      username: 'Player ' + Math.round(Math.random() * 9999).toFixed()
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
  get: get,
  set: set
};
