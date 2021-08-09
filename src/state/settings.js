const deepmerge = require('deepmerge');
const store = require('store');

const defaultSettings = {
  locale: 'en',
  server: 'https://server.chessin5d.net',
  key: 'ff104801-d3da-49b5-ae3c-11a3198f6c22',
  eruda: false,
  xmpp: true,
  xmppBosh: false,
  autoUpdate: true,
  quickPlay: {
    variants: ['turn_zero'],
    formats: ['blitz', 'rapid']
  }
};

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

export const set = (settings, emitter = null) => {
  store.set('settings', deepmerge(store.get('settings'), settings, { arrayMerge: overwriteMerge }));
  if(emitter !== null) {
    emitter.emit('settingsUpdate');
  }
}

export const get = () => {
  var storedSettings = store.get('settings');
  if(typeof storedSettings === 'object' && storedSettings !== null) {
    return deepmerge(defaultSettings, storedSettings, { arrayMerge: overwriteMerge });
  }
  return defaultSettings;
}

export const reset = (emitter = null) => {
  store.remove('settings');
  if(emitter !== null) {
    emitter.emit('settingsUpdate');
  }
}