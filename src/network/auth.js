import * as authStore from 'state/auth';
import * as settings from 'state/settings';

const axios = require('axios');

const authCheck = async (emitter) => {
  var storedAuth = authStore.get();
  var serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    try {
      var res = await axios.get(`${serverUrl}/authCheck`, {
        headers: {
          'Authorization': storedAuth.token
        }
      });
      var currentTime = Date.now();
      authStore.set({
        lastOnline: currentTime,
        lastAuthCheck: currentTime,
      }, emitter);
      storedAuth = authStore.get();
      if(storedAuth.xmpp === null) {
        xmpp(emitter);
      }
      //Do token refresh every 30 minutes
      if(currentTime - storedAuth.lastTokenRefresh > 10*60*1000) {
        res = await axios.get(`${serverUrl}/refreshToken`, {
          headers: {
            'Authorization': storedAuth.token
          }
        });
        authStore.set({
          token: res.data,
          lastOnline: currentTime,
          lastAuthCheck: currentTime,
          lastTokenRefresh: currentTime,
        }, emitter);
        xmpp(emitter);
      }
    }
    catch(err) {
      res = err.response;
      if(res && res.status !== 429) {
        authStore.set({
          token: null,
          lastOnline: 0,
          lastAuthCheck: 0,
          lastTokenRefresh: 0,
        }, emitter);
      }
    }
  }
}

export const init = (emitter) => {
  authCheck(emitter);
  window.setInterval(() => {
    authCheck(emitter);
  }, 60*1000);
}

export const login = async (username, password, emitter) => {
  var serverUrl = settings.get().server;
  try {
    var res = (await axios.post(`${serverUrl}/login`, {
      username: username,
      password: password
    }));
    if(res.status === 200) {
      var currentTime = Date.now();
      authStore.set({
        token: res.data,
        lastOnline: currentTime,
        lastAuthCheck: currentTime,
        lastTokenRefresh: currentTime,
      }, emitter);
    }
    else {
      authStore.set({
        token: null,
        lastOnline: 0,
        lastAuthCheck: 0,
        lastTokenRefresh: 0,
      }, emitter);
    }
  }
  catch(err) {
    throw err;
  }
}

export const register = async (username, password, email, emitter) => {
  var serverUrl = settings.get().server;
  try {
    let data = {
      username: username,
      password: password
    };
    if(typeof email === 'string' && email.length > 0) {
      data.email = email;
    }
    let res = (await axios.post(`${serverUrl}/register`, data));
    if(res.status === 200) {
      let currentTime = Date.now();
      authStore.set({
        token: res.data,
        lastOnline: currentTime,
        lastAuthCheck: currentTime,
        lastTokenRefresh: currentTime,
      }, emitter);
    }
    else {
      authStore.set({
        token: null,
        lastOnline: 0,
        lastAuthCheck: 0,
        lastTokenRefresh: 0,
      }, emitter);
    }
  }
  catch(err) {
    throw err;
  }
}

export const logout = (emitter) => {
  authStore.set({
    token: null
  }, emitter);
}

export const recoverCode = async (email) => {
  var serverUrl = settings.get().server;
  await axios.post(`${serverUrl}/recoverCode`, {
    email: email
  });
}

export const recover = async (email, recoverCode, password) => {
  var serverUrl = settings.get().server;
  await axios.post(`${serverUrl}/recover`, {
    email: email,
    recoverCode: recoverCode,
    password: password
  });
}

export const xmpp = async (emitter) => {
  var storedAuth = authStore.get();
  var serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    try {
      var res = await axios.get(`${serverUrl}/xmpp`, {
        headers: {
          'Authorization': storedAuth.token
        }
      });
      var currentTime = Date.now();
      if(typeof res.data.domain !== 'string') {
        authStore.set({
          lastOnline: currentTime,
          xmpp: null
        }, emitter);
      }
      else {
        authStore.set({ xmpp: null });
        authStore.set({
          lastOnline: currentTime,
          xmpp: res.data
        }, emitter);
      }
    }
    catch(err) {
      res = err.response;
      if(res && res.status !== 429) {
        currentTime = Date.now();
        authStore.set({
          lastOnline: currentTime,
          xmpp: null
        }, emitter);
      }
    }
  }
}
