import * as authStore from 'state/auth';
import * as settings from 'state/settings';
import * as SessionGenerate from 'utils/SessionGenerate';
import * as SessionTransform from 'utils/SessionTransform';

const store = require('store');
const axios = require('axios');
const collections = require('state/db').init();

export const getCurrentSession = async (id) => {
  //Look for session in db
  let existingSession = (await collections.currentSessions.findOne({ id: id }));
  if(existingSession !== null) {
    //Check if session is online
    if(typeof existingSession.host !== 'undefined') {
      let lastQuery = store.get('network/session/get');
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
          store.set('network/session/get', Date.now());
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
        let res = (await axios.post(`${serverUrl}/sessions/new`, {
          player: player,
          variant: variant,
          format: format,
          ranked: ranked
        }, options));
        let newSession = res.data;
        await collections.sessionRequests.update({ id: newSession.id }, { $set: newSession }, { upsert: true });
        store.set('network/session/new', Date.now());
        emitter.emit('sessionsUpdate');
      }
      catch(err) {}
    }
  }
  else {
    let newSession = SessionGenerate.generate(variant, format);
    await collections.currentSessions.update({ id: newSession.id }, { $set: newSession }, { upsert: true });
    emitter.emit('sessionsUpdate');
  }
}

const getPastSessions = async () => {
  let lastQuery = store.get('network/games/get');
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(typeof lastQuery !== 'number') { lastQuery = 0; }
  if(Date.now() - lastQuery > 2*1000 && storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.post(`${serverUrl}/games`, {
      query: {
        $or: [
          { white: storedAuth.username },
          { black: storedAuth.username }
        ]
      },
      sort: { endDate: -1 }
    }, options));
    let networkGames = res.data;
    let bulkDbUpdates = [];
    for(let networkGame of networkGames) {
      let pastSession = SessionTransform.fromServerGame(networkGame);
      bulkDbUpdates.push(
        collections.pastSessions.update({ id: pastSession.id }, { $set: pastSession }, { upsert: true })
      );
    }
    await Promise.all(bulkDbUpdates);
    store.set('network/games/get', Date.now());
  }
  return (await collections.pastSessions.find({}));
}

export const getSessions = async (emitter) => {
  let sessions = {
    sessionRequests: [],
    currentSessions: [],
    pastSessions: []
  };
  let lastQuery = store.get('network/sessions/get');
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(typeof lastQuery !== 'number') { lastQuery = 0; }
  if(Date.now() - lastQuery > 2*1000 && storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.post(`${serverUrl}/sessions`, {
      query: {
        $or: [
          { white: storedAuth.username },
          { black: storedAuth.username },
          {
            $and: [
              { $or: [ { white: null }, { black: null } ] },
              { requestJoin: storedAuth.username }
            ]
          }
        ]
      }
    }, options));
    let networkSessions = res.data;
    let bulkDbUpdates = [];
    //Remove existing online sessions within local db
    await Promise.all([
      collections.sessionRequests.remove({ host: { $exists: true } }, { multi: true }),
      collections.currentSessions.remove({ host: { $exists: true } }, { multi: true })
    ]);
    for(let networkSession of networkSessions) {
      if(!networkSession.started) {
        if(networkSession.white === null || networkSession.black === null) {
          if(networkSession.host === storedAuth.username || networkSession.requestJoin.includes(storedAuth.username)) {
            bulkDbUpdates.push(
              collections.sessionRequests.update({ id: networkSession.id }, { $set: networkSession }, { upsert: true })
            );
          }
        }
      }
      else {
        if(networkSession.white === storedAuth.username || networkSession.black === storedAuth.username) {
          bulkDbUpdates.push(
            collections.currentSessions.update({ id: networkSession.id }, { $set: networkSession }, { upsert: true })
          );
        }
      }
    }
    await Promise.all(bulkDbUpdates);
    store.set('network/sessions/get', Date.now());
    emitter.emit('sessionsUpdate');
  }
  sessions.sessionRequests = (await collections.sessionRequests.find({}));
  sessions.currentSessions = (await collections.currentSessions.find({}).sort({ startDate: -1 }));
  sessions.pastSessions = (await getPastSessions());
  return sessions;
}