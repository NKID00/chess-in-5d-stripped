const store = require('store');

const clearIDB = async () => {
  // Credit to @steobrien from https://gist.github.com/rmehner/b9a41d9f659c9b1c3340#gistcomment-2940034
  // Code taken from: https://gist.github.com/rmehner/b9a41d9f659c9b1c3340
  const dbs = await window.indexedDB.databases();
  dbs.forEach((db) => { 
    window.indexedDB.deleteDatabase(db.name);
  });
}

export const init = () => {
  var storedVersion = store.get('version');
  var currVersion = process.env.REACT_APP_VERSION;

  //Clear storage if no version detected
  if(typeof storedVersion === 'undefined' || storedVersion === null) {
    store.clearAll();
    window.localStorage.clear();
    clearIDB();
  }

  //TODO: Use version system to smoothly update

  //Store current version
  store.set('version', currVersion);
}
