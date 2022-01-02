const store = require('store');

const clearIDB = async () => {
  // Credit to @steobrien from https://gist.github.com/rmehner/b9a41d9f659c9b1c3340#gistcomment-2940034
  // Code taken from: https://gist.github.com/rmehner/b9a41d9f659c9b1c3340
  try {
    const dbs = await window.indexedDB.databases();
    dbs.forEach((db) => { 
      window.indexedDB.deleteDatabase(db.name);
    });
  }
  catch(err) {
    console.error(err);
  }
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

  //TODO: Temp storage clearing every new version (dev purposes only)
  if(storedVersion !== currVersion) {
    console.info('(DEV) New version, wiping storage');
    store.clearAll();
    window.localStorage.clear();
    clearIDB();
  }

  //TODO: Use version system to smoothly update

  //Store current version
  store.set('version', currVersion);
}

export const get = () => {
  return store.get('version');
}