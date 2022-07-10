import { satisfies } from 'compare-versions';
const store = require('store');

const clearIDB = async () => {
  // Credit to @steobrien from https://gist.github.com/rmehner/b9a41d9f659c9b1c3340#gistcomment-2940034
  // Code taken from: https://gist.github.com/rmehner/b9a41d9f659c9b1c3340
  try {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
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
  } else if(!satisfies(storedVersion, '^1.0.3')) {  //Clear storage if older than 1.0.3
    console.info('[Version] Previous version is older than 1.0.3, wiping storage');
    store.clearAll();
    window.localStorage.clear();
    clearIDB();
  }

  //Store current version
  store.set('version', currVersion);
}

export const get = () => {
  return store.get('version');
}