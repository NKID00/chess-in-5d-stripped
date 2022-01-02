import * as authStore from 'state/auth';
import * as settings from 'state/settings';

const store = require('store');
const axios = require('axios');
var collections = require('state/db').init();

export const get = async (query = {}, projection = {}, sort = {}, limit = 100, skip = 0) => {
  var currentDate = Date.now();
  var storedAuth = authStore.get();
  var serverUrl = settings.get().server;
  var lastQuery = store.get('network/user/get');
  if(typeof lastQuery !== 'number') { lastQuery = 0; }
  if(currentDate - lastQuery > 6*1000) {
    try {
      var options = {};
      if(storedAuth.token !== null) {
        options = {
          headers: {
            'Authorization': storedAuth.token
          }
        };
      }
      var res = (await axios.post(`${serverUrl}/users`, {
        query: query,
        projection: projection,
        sort: sort,
        limit: limit,
        skip: skip
      }, options));
      if(res.status === 200) {
        var bulkDbUpdates = [];
        var users = res.data;
        for(var i = 0;i < users.length;i++) {
          bulkDbUpdates.push(
            collections.users.update({ username: users[i].username }, { $set: users[i] }, { upsert: true })
          );
        }
        await Promise.all(bulkDbUpdates);
      }
    }
    catch(err) {}
    store.set('network/user/get', currentDate);
  }
  return (await collections.users.find(query, projection).sort(sort).limit(limit).skip(skip));
}

export const getOne = async (username) => {
  var currentDate = Date.now();
  var storedAuth = authStore.get();
  var serverUrl = settings.get().server;
  var lastQuery = store.get('network/user/getOne');
  if(typeof lastQuery !== 'number') { lastQuery = 0; }
  if(currentDate - lastQuery > 6*1000) {
    try {
      var options = {};
      if(storedAuth.token !== null) {
        options = {
          headers: {
            'Authorization': storedAuth.token
          }
        };
      }
      var res = (await axios.get(`${serverUrl}/users/${username}`, options));
      if(res.status === 200) {
        var user = res.data;
        await collections.users.update({ username: username }, { $set: user }, { upsert: true });
      }
    }
    catch(err) {}
    store.set('network/user/getOne', currentDate);
  }
  return (await collections.users.findOne({ username: username }));
}

export const update = async (data) => {
  var currentDate = Date.now();
  var storedAuth = authStore.get();
  var serverUrl = settings.get().server;
  var lastQuery = store.get('network/user/update');
  if(typeof lastQuery !== 'number') { lastQuery = 0; }
  if(currentDate - lastQuery > 6*1000) {
    var options = {};
    if(storedAuth.token !== null) {
      options = {
        headers: {
          'Authorization': storedAuth.token
        }
      };
      var res = (await axios.post(`${serverUrl}/users/${storedAuth.username}/update`, data, options));
      if(res.status === 200) {
        var user = res.data;
        await collections.users.update({ username: storedAuth.username }, { $set: user }, { upsert: true });
      }
    }
    else {
      throw new Error('Not logged in!');
    }
  }
  else {
    throw new Error('Too many requests!');
  }
}