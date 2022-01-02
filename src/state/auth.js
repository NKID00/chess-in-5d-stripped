const deepmerge = require('deepmerge');
const store = require('store');

const defaultAuth = {
  token: null,
  lastOnline: 0,
  lastAuthCheck: 0,
  lastTokenRefresh: 0,
  xmpp: null,
  username: ''
};

export const set = (auth, emitter = null) => {
  store.set('auth', deepmerge(store.get('auth'), auth));
  if(emitter !== null) {
    emitter.emit('authUpdate');
  }
}

export const get = () => {
  var storedAuth = store.get('auth');
  if(typeof storedAuth === 'object' && storedAuth !== null) {
    return deepmerge(defaultAuth, storedAuth);
  }
  return defaultAuth;
}

export const isLoggedIn = () => {
  var currentTime = Date.now();
  var storedAuth = store.get('auth');
  if(typeof storedAuth === 'object' && storedAuth !== null) {
    storedAuth = deepmerge(defaultAuth, storedAuth);
  }
  else {
    storedAuth = defaultAuth;
  }
  //If token is null, not logged in
  if(storedAuth.token === null) { return false; }
  //If we have not properly communicated with the server for longer than 10 seconds, not logged in
  //if(currentTime - storedAuth.lastOnline > 10*1000) { return false; }
  //If we have not done an auth check with the server for longer than 2*60 seconds, not logged in
  if(currentTime - storedAuth.lastAuthCheck > 2*60*1000) { return false; }
  //If we have not refreshed token in 30*60 seconds, not logged in
  if(currentTime - storedAuth.lastTokenRefresh > 30*60*1000) { return false; }
  return true;
}