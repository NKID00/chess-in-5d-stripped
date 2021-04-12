const deepmerge = require('deepmerge');
const store = require('store');

const defaultConfig = {};

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