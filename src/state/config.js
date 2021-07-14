const deepmerge = require('deepmerge');
const store = require('store');

const defaultConfig = {
  app: {
    forceCanvas: false,
    interactive: true,
  },
  fps: {
    show: false,
    fpsTextOptions: {
      fontSize: 16
    }
  },
  background: {
    showRectangle: true,
    blur: true,
    blurStrength: 3,
    striped: true,
    stripeRatio: 0.333
  },
  board: {
    marginWidth: 160,
    marginHeight: 160,
    borderWidth: 50,
    borderHeight: 50,
    borderRadius: 45,
    borderLineWidth: 12,
    showGhost: true,
    showWhite: true,
    showBlack: true,
    flipTimeline: false,
    flipRank: false,
    ghostAlpha: 0.4,
    showPresentBlink: true,
  },
  arrow: {
    showSpatial: false,
    spatialCurved: false,
    showNonSpatial: true,
    nonSpatialCurved: true,
    customCurved: false,
    customMiddleCurved: true
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
    autoRecenter: false,
    autoSubmit: false
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

export const reset = (emitter = null) => {
  store.remove('config');
  if(emitter !== null) {
    emitter.emit('configUpdate');
  }
}