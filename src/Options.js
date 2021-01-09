const store = require('store');

const defaultPalette = {
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
  checkBoardLabel: 0xffffff,
  drawArrow1: 0xd3a026,
  drawArrow2: 0x0dd95b,
  drawArrow3: 0x32dcfa,
  drawArrow4: 0xf50000
};

const resetPalette = () => {
  store.set('palette', Object.assign({}, defaultPalette));
};

const getDefault = (str) => {
  var defaultObj = {};
  if(str === 'server') {
    defaultObj = {
      url: 'server.chessin5d.net',
      key: 'ff104801-d3da-49b5-ae3c-11a3198f6c22',
      jwt: ''
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
    defaultObj = Object.assign({}, defaultPalette);
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
  else if(str === 'settings') {
    defaultObj = {
      boardShow: 'both',
      allowRecenter: true,
      moveShow: 'timeline',
      flip: false,
      timelineLabel: true,
      turnLabel: true,
      boardLabel: false,
      showCheckGhost: true
    };
  }
  else if(str === 'tutorial') {
    defaultObj = {
      tutorialPopup: true
    };
  }
  return defaultObj;
};

const get = (str) => {
  var res = store.get(str);
  var defaultObj = getDefault(str);
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

const reset = () => {
  store.clearAll();
  store.set('server', getDefault('server'));
  store.set('peerjs', getDefault('peerjs'));
  store.set('palette', Object.assign({}, defaultPalette));
  store.set('name', getDefault('name'));
  store.set('sound', getDefault('sound'));
  store.set('settings', getDefault('settings'));
  store.set('tutorial', getDefault('tutorial'));
};

export default {
  reset: reset,
  resetPalette: resetPalette,
  get: get,
  set: set
};
