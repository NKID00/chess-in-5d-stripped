const store = require('store');

export const set = (config, emitter = null) => {
  store.set('config', config);
  if(emitter !== null) {
    emitter.emit('configUpdate');
  }
}

export const get = () => {
  var storedConfig = store.get('config');
  if(typeof storedConfig === 'object') {
    return storedConfig;
  }
  return {};
}