const deepmerge = require('deepmerge');
const store = require('store');

const defaultSettings = {
  locale: 'en',
  server: 'server.chessin5d.net',
  xmpp: 'xmpp.chessin5d.net',
  xmppMuc: 'xmppmuc.chessin5d.net',
};

export const set = (settings, emitter = null) => {
  store.set('settings', settings);
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