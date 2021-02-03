import Options from 'Options';

const collections = require('db/Db').init();
const store = require('store');
const axios = require('axios');

export const getUsers = async () => {
  var res = (await collections.users.find({})).map(e => {
    delete e._id;
    return e;
  });
  var lastUpdated = store.get('db-users-lastUpdated');
  if(typeof lastUpdated !== 'number') {
    lastUpdated = 0;
  }
  if(Date.now() - 5000 > lastUpdated) {
    var token = Options.get('name').token;
    var data = (await axios.get(Options.get('server').url + '/users', {
      headers: {
        'Authorization': token
      }
    }).catch(err => {
      return { data: [] };
    })).data;

    (async (data) => {
      await collections.users.remove({}, { multi: true });
      await collections.users.insert(data);
    })(data);

    store.set('db-users-lastUpdated', Date.now());
    return data;
  }
  return res;
}

export const getUser = async (username) => {
  var res = (await collections.users.findOne({ username: username }));
  var lastUpdated = store.get('db-user-lastUpdated-' + username);
  if(typeof lastUpdated !== 'number') {
    lastUpdated = 0;
  }
  if(Date.now() - 5000 > lastUpdated) {
    var token = Options.get('name').token;
    var data = (await axios.get(Options.get('server').url + '/users/' + username, {
      headers: {
        'Authorization': token
      }
    }).catch(err => {
      if(res === null) {
        return { data: null };
      }
      delete res._id;
      return res;
    })).data;

    (async (data) => {
      if(data !== null) {
        await collections.users.remove({ username: username });
        await collections.users.insert(data);
      }
    })(data);

    store.set('db-users-lastUpdated-' + username, Date.now());
    return data;
  }
  delete res._id;
  return res;
}