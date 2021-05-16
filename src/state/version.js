const store = require('store');

exports.init = () => {
  var storedVersion = store.get('version');
  var currVersion = process.env.REACT_APP_VERSION;

  //Clear storage if no version detected
  if(typeof storedVersion === 'undefined' || storedVersion === null) {
    store.clearAll();
  }

  //TODO: Use version system to smoothly update

  //Store current version
  store.set('version', currVersion);
}
