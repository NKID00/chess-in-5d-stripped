import Options from 'Options';

const collections = require('db/Db').init();
const store = require('store');
const axios = require('axios');

export const getSessions = async () => {
  var res = (await collections.sessions.find({})).map(e => {
    delete e._id;
    return e;
  });
  var lastUpdated = store.get('db-sessions-lastUpdated');
  if(typeof lastUpdated !== 'number') {
    lastUpdated = 0;
  }
  if(Date.now() - 2000 > lastUpdated) {
    var token = Options.get('name').token;
    var data = (await axios.get(Options.get('server').url + '/sessions', {
      headers: {
        'Authorization': token
      }
    }).catch(err => {
      return { data: [] };
    })).data;

    (async (data) => {
      await collections.sessions.remove({}, { multi: true });
      await collections.sessions.insert(data);
    })(data);

    store.set('db-sessions-lastUpdated', Date.now());
    return data;
  }
  return res;
}
