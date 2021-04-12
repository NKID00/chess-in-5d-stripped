const deepmerge = require('deepmerge');
const store = require('store');

const defaultSettings = {
  locale: 'en',
  server: 'https://server.chessin5d.net',
};

export const set = (settings, emitter = null) => {
  store.set('settings', deepmerge(store.get('settings'), settings));
  if(emitter !== null) {
    emitter.emit('settingsUpdate');
  }
}

export const get = () => {
  var storedSettings = store.get('settings');
  if(typeof storedSettings === 'object') {
    return deepmerge(defaultSettings, storedSettings);
  }
  return defaultSettings;
}