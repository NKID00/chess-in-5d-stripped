import * as authStore from 'state/auth';
import * as settings from 'state/settings';
import Delay from 'utils/Delay';
import * as SessionGenerate from 'utils/SessionGenerate';
import * as SessionTransform from 'utils/SessionTransform';

const store = require('store');
const axios = require('axios');
const collections = require('state/db').init();

export const getCurrentSession = async (id) => {
  //Look for session in db
  let existingSession = (await collections.currentSessions.findOne({ id: id }));
  if((existingSession !== null && typeof existingSession.host !== 'undefined') || existingSession === null) {
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
  if(existingSession && existingSession._id) {
    delete existingSession._id;
  }
  return existingSession;
}

export const getSession = async (id) => {
  //Look for session in db
  let existingSession = (await collections.pastSessions.findOne({ id: id }));
  if(existingSession !== null) {
    return existingSession;
  }
  existingSession = (await collections.sessionCache.findOne({ id: id }));
  if((existingSession !== null && typeof existingSession.host !== 'undefined') || existingSession === null) {
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
          await collections.sessionCache.update({ id: existingSession.id }, { $set: existingSession }, { upsert: true });
        }
        store.set('network/session/get', Date.now());
      }
      catch(err) {}
    }
  }
  if(existingSession && existingSession._id) {
    delete existingSession._id;
  }
  return existingSession;
}

export const createSession = async (online = false, variant = 'standard', format = null, player = 'white', ranked = false, emitter = null) => {
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
        if(emitter !== null) {
          emitter.emit('sessionsUpdate');
        }
        return newSession;
      }
      catch(err) {}
    }
  }
  else {
    let newSession = SessionGenerate.generate(variant, format);
    await collections.currentSessions.update({ id: newSession.id }, { $set: newSession }, { upsert: true });
    if(emitter !== null) {
      emitter.emit('sessionsUpdate');
    }
    return newSession;
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

export const getSessions = async (emitter = null) => {
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
    if(emitter !== null) {
      emitter.emit('sessionsUpdate');
    }
  }
  sessions.sessionRequests = (await collections.sessionRequests.find({}));
  sessions.currentSessions = (await collections.currentSessions.find({}).sort({ startDate: -1 }));
  sessions.pastSessions = (await getPastSessions());
  return sessions;
}

export const getSessionsQuery = async (query = {}, projection = {}, sort = {}, limit = 100, skip = 0) => {
  let lastQuery = store.get('network/sessions/get');
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(typeof lastQuery !== 'number') { lastQuery = 0; }
  if(Date.now() - lastQuery <= 1500) {
    await Delay(1500 - (Date.now() - lastQuery));
  }
  let options = {};
  if(storedAuth.token !== null) {
    options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
  }
  let res = (await axios.post(`${serverUrl}/sessions`, {
    query: query,
    projection: projection,
    sort: sort,
    limit: limit,
    skip: skip
  }, options));
  let networkSessions = res.data;
  store.set('network/sessions/get', Date.now());
  return networkSessions;
}

export const getPastSessionsQuery = async (query = {}, projection = {}, sort = {}, limit = 100, skip = 0) => {
  let lastQuery = store.get('network/games/get');
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(typeof lastQuery !== 'number') { lastQuery = 0; }
  if(Date.now() - lastQuery <= 1500) {
    await Delay(1500 - (Date.now() - lastQuery));
  }
  let options = {
    headers: {
      'Authorization': storedAuth.token
    }
  };
  let res = (await axios.post(`${serverUrl}/games`, {
    query: query,
    projection: projection,
    sort: sort,
    limit: limit,
    skip: skip
  }, options));
  let networkGames = res.data;
  let networkSessions = [];
  for(let networkGame of networkGames) {
    let pastSession = SessionTransform.fromServerGame(networkGame);
    networkSessions.push(pastSession);
  }
  store.set('network/games/get', Date.now());
  return networkSessions;
}

export const moveSession = async (id, move) => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.post(`${serverUrl}/sessions/${id}/move`, move, options));
    return res.data;
  }
  throw new Error('Not logged in!');
}

export const undoSession = async (id) => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.post(`${serverUrl}/sessions/${id}/undo`, {}, options));
    return res.data;
  }
  throw new Error('Not logged in!');
}

export const submitSession = async (id) => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.post(`${serverUrl}/sessions/${id}/submit`, {}, options));
    return res.data;
  }
  throw new Error('Not logged in!');
}

export const forfeitSession = async (id) => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.post(`${serverUrl}/sessions/${id}/forfeit`, {}, options));
    return res.data;
  }
  throw new Error('Not logged in!');
}

export const drawSession = async (id) => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.post(`${serverUrl}/sessions/${id}/draw`, {}, options));
    return res.data;
  }
  throw new Error('Not logged in!');
}

export const requestJoinSession = async (id) => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.post(`${serverUrl}/sessions/${id}/requestJoin`, {}, options));
    return res.data;
  }
  throw new Error('Not logged in!');
}

export const addUserSession = async (id, username) => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.post(`${serverUrl}/sessions/${id}/addUser`, {
      username: username
    }, options));
    return res.data;
  }
  throw new Error('Not logged in!');
}

export const readySession = async (id) => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.post(`${serverUrl}/sessions/${id}/ready`, {}, options));
    return res.data;
  }
  throw new Error('Not logged in!');
}

export const unreadySession = async (id) => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.post(`${serverUrl}/sessions/${id}/unready`, {}, options));
    return res.data;
  }
  throw new Error('Not logged in!');
}

export const startSession = async (id) => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.post(`${serverUrl}/sessions/${id}/start`, {}, options));
    return res.data;
  }
  throw new Error('Not logged in!');
}