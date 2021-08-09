import * as authStore from 'state/auth';
import * as settings from 'state/settings';

const store = require('store');
const axios = require('axios');

export const get = async () => {
  var vAFData = store.get('network/variantsAndFormats/get');
  var storedAuth = authStore.get();
  var serverUrl = settings.get().server;
  if(typeof vAFData !== 'object') {
    vAFData = {
      lastQuery: 0,
      variants: [],
      formats: []
    };
  }
  if(Date.now() - vAFData.lastQuery > 6*1000) {
    var options = {};
    if(storedAuth.token !== null) {
      options = {
        headers: {
          'Authorization': storedAuth.token
        }
      };
    }
    try {
      var variants = await axios.get(`${serverUrl}/ranked/variants`, options);
      var formats = await axios.get(`${serverUrl}/ranked/formats`, options);
      vAFData = {
        lastQuery: Date.now(),
        variants: variants.data,
        formats: formats.data
      };
    }
    catch(err) {}
    store.set('network/variantsAndFormats/get', vAFData);
  }
  return vAFData;
}