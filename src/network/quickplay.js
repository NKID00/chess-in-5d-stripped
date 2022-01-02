import * as authStore from 'state/auth';
import * as settings from 'state/settings';

const axios = require('axios');

export const startQueue = async (ranked, variants, formats, minRating = null, maxRating = null) => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let postData = {
      ranked: ranked,
      variants: variants,
      formats: formats
    };
    if(minRating !== null) {
      postData.minRating = minRating;
    }
    if(maxRating !== null) {
      postData.maxRating = maxRating;
    }
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.post(`${serverUrl}/quickplay/queue`, postData, options));
    return res.data;
  }
  else {
    throw new Error('Not logged in!');
  }
}

export const getQueue = async () => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.get(`${serverUrl}/quickplay/queue`, options));
    return res.data;
  }
  else {
    throw new Error('Not logged in!');
  }
}

export const cancelQueue = async () => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.get(`${serverUrl}/quickplay/cancel`, options));
    return res.data;
  }
  else {
    throw new Error('Not logged in!');
  }
}

export const confirmQueue = async () => {
  let storedAuth = authStore.get();
  let serverUrl = settings.get().server;
  if(storedAuth.token !== null) {
    let options = {
      headers: {
        'Authorization': storedAuth.token
      }
    };
    let res = (await axios.get(`${serverUrl}/quickplay/confirm`, options));
    return res.data;
  }
  else {
    throw new Error('Not logged in!');
  }
}