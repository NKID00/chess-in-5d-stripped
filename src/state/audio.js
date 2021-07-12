var collections = require('state/db').init();

export const set = async (key, audio, emitter = null) => {
  var newTexture = {
    key: key,
    audio: audio
  };
  await collections.audio.update({ key: key }, { $set: newTexture }, { upsert: true });
  if(emitter !== null) {
    emitter.emit('audioUpdate');
  }
}

export const get = async (key) => {
  return (await collections.audios.findOne({ key: key }));
}

export const reset = async (emitter = null) => {
  await collections.audios.remove({}, { multi: true });
  if(emitter !== null) {
    emitter.emit('audioUpdate');
  }
}