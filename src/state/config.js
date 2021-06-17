const deepmerge = require('deepmerge');
const store = require('store');

const defaultConfig = {
  arrow: {
    showSpatial: false,
    showNonSpatial: false
  },
  board:{
    showGhost: true,
    showWhite: true,
    showBlack: true,
    flipTimeline: false,
    flipRank: false
  },
  boardLabel: {
    showTimeline: true,
    showTurn: true,
    showFile: true,
    showRank: true
  },
  notation: {
    newPresentToken: {
      show: true
    },
    newTimelineToken: {
      show: true
    }
  },
  extra: {
    autoRecenter: false
  }
};

export const set = (config, emitter = null) => {
  store.set('config', deepmerge(store.get('config'), config));
  if(emitter !== null) {
    emitter.emit('configUpdate');
  }
}

export const get = () => {
  var storedConfig = store.get('config');
  if(typeof storedConfig === 'object') {
    return deepmerge(defaultConfig, storedConfig);
  }
  return defaultConfig;
}