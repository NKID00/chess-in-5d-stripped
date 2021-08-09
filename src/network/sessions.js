import * as authStore from 'state/auth';
import * as settings from 'state/settings';
import * as SessionGenerate from 'utils/SessionGenerate';

const store = require('store');
const axios = require('axios');
const collections = require('state/db').init();

export const getCurrentSession = async (id) => {
  //Look for session in db
  let existingSession = (await collections.currentSessions.findOne({ id: id }));
  if(existingSession !== null) {
    //Check if session is online
    if(typeof existingSession.host !== 'undefined') {
      let lastQuery = store.get('network/session/id/get');
      let storedAuth = authStore.get();
      let serverUrl = settings.get().server;
      if(typeof lastQuery !== 'number') { lastQuery = 0; }
      if(Date.now() - lastQuery > 333 && storedAuth.token !== null) {
        let options = {
          headers: {
            'Authorization': storedAuth.token
          }
        };
        try {
          let res = (await axios.get(`${serverUrl}/sessions/${id}`, options));
          if(res.status === 200) {
            existingSession = res.data;
            await collections.currentSessions.update({ id: existingSession.id }, { $set: existingSession }, { upsert: true });
          }
          store.set('network/session/id/get', Date.now());
        }
        catch(err) {}
      }
    }
  }
  return existingSession;
}

export const createSession = async (online = false, variant = 'standard', format = null, player = 'white', ranked = false, emitter) => {
  if(online) {
    let lastQuery = store.get('network/session/new');
    let storedAuth = authStore.get();
    let serverUrl = settings.get().server;
    if(typeof lastQuery !== 'number') { lastQuery = 0; }
    if(Date.now() - lastQuery > 6*1000 && storedAuth.token !== null) {
      let options = {
        headers: {
          'Authorization': storedAuth.token
        }
      };
      try {
        store.set('network/session/new', Date.now());
        let res = (await axios.post(`${serverUrl}/sessions/new`, {
          player: player,
          variant: variant,
          format: format,
          ranked: ranked
        }, options));
        let newSession = res.data;
        await collections.sessionRequests.update({ id: newSession.id }, { $set: newSession }, { upsert: true });
        emitter.emit('sessionCreate');
      }
      catch(err) {}
    }
  }
  else {
    let newSession = SessionGenerate.generate(variant, format);
    await collections.currentSessions.update({ id: newSession.id }, { $set: newSession }, { upsert: true });
    emitter.emit('sessionCreate');
  }
}

export const getCurrentSessions = async () => {

}