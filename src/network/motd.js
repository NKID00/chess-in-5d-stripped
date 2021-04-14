import * as authStore from 'state/auth';
import * as settings from 'state/settings';

const store = require('store');
const axios = require('axios');

export const getMotd = async () => {
  var prevStore = store.get('motd');
  var storedAuth = authStore.get();
  var serverUrl = settings.get().server;
  if(typeof prevStore !== 'object') {
    prevStore = {
      lastUpdate: 0,
      motd: null
    };
  }
  if(Date.now() - prevStore.lastUpdate > 30*60*1000) {
    var options = {};
    if(storedAuth.token !== null) {
      options = {
        headers: {
          'Authorization': storedAuth.token
        }
      }
    }
    try {
      var res = await axios.get(`${serverUrl}/message`, options);
      prevStore = {
        lastUpdate: Date.now(),
        motd: res.data
      };
    }
    catch(err) {}
    store.set('motd', prevStore);
  }
  return prevStore.motd;
}