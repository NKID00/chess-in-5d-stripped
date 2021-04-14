import * as authStore from 'state/auth';
import * as settings from 'state/settings';

const store = require('store');
const axios = require('axios');

export const get = async () => {
  var motdData = store.get('network/motd/get');
  var storedAuth = authStore.get();
  var serverUrl = settings.get().server;
  if(typeof motdData !== 'object') {
    motdData = {
      lastQuery: 0,
      motd: null
    };
  }
  if(Date.now() - motdData.lastQuery > 30*60*1000) {
    var options = {};
    if(storedAuth.token !== null) {
      options = {
        headers: {
          'Authorization': storedAuth.token
        }
      };
    }
    try {
      var res = await axios.get(`${serverUrl}/message`, options);
      motdData = {
        lastQuery: Date.now(),
        motd: res.data
      };
    }
    catch(err) {}
    store.set('network/motd/get', motdData);
  }
  return motdData.motd;
}