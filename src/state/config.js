const deepmerge = require('deepmerge');
const store = require('store');

const defaultConfig = {
  app: {
    forceCanvas: false,
    interactive: true,            //Controlled by game
  },
  fps: {
    show: false,
    fpsTextOptions: {
      fontSize: 16,
    }
  },
  background: {
    showRectangle: true,
    blur: true,
    blurStrength: 3,
    striped: true,
    stripeRatio: 0.333,
    expandDuration: 350,
  },
  board: {
    showGhost: true,              //Controlled by in game settings menu
    showWhite: true,              //Controlled by in game settings menu
    showBlack: true,              //Controlled by in game settings menu
    flipTimeline: false,          //Controlled by in game settings menu
    flipRank: false,              //Controlled by in game settings menu
    flipFile: false,              //Controlled by in game settings menu
    marginWidth: 160,
    marginHeight: 160,
    borderWidth: 50,
    borderHeight: 50,
    borderRadius: 45,
    borderLineWidth: 12,
    ghostAlpha: 0.4,
    showPresentBlink: true,
    blinkDuration: 350,
    fadeDuration: 450,
  },
  boardLabel: {
    showTimeline: true,           //Controlled by in game settings menu
    showTurn: true,               //Controlled by in game settings menu
    showFile: true,               //Controlled by in game settings menu
    showRank: true,               //Controlled by in game settings menu
    fadeDuration: 250,
  },
  boardShadow: {
    show: true,
    offsetX: 40,
    offsetY: 40,
    alpha: 0.25,
  },
  arrow: {
    showSpatial: false,           //Controlled by in game settings menu
    showNonSpatial: true,         //Controlled by in game settings menu
    size: 12,
    headSize: 35,
    midpointRadius: 11,
    outlineSize: 22,
    animateDuration: 650,
    alpha: 0.6,
    spatialCurved: false,
    spatialSplitCurve: false,
    spatialMiddle: false,
    spatialRealEnd: false,
    nonSpatialCurved: true,
    nonSpatialSplitCurve: true,
    nonSpatialMiddle: true,
    nonSpatialRealEnd: true,
    checkCurved: true,
    customCurved: false,
    customSplitCurved: true,
    customMiddleCurved: true,
    customMiddleSplitCurved: true,
  },
  notation: {                     //Not used in 5d-chess-renderer
    newPresentToken: {
      show: true,
    },
    newTimelineToken: {
      show: true,
    }
  },
  extra: {                        //Not used in 5d-chess-renderer
    autoRecenter: true,
    autoSubmit: false,
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