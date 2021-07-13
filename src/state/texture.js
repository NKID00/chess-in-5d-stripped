var collections = require('state/db').init();

export const set = async (key, name, texture, emitter = null) => {
  var newTexture = {
    key: key,
    name: name,
    texture: texture
  };
  await collections.textures.update({ key: key }, { $set: newTexture }, { upsert: true });
  if(emitter !== null) {
    emitter.emit('textureUpdate');
  }
}

export const remove = async (key, emitter = null) => {
  await collections.textures.remove({ key: key }, { multi: true });
}

export const get = async (key) => {
  return (await collections.textures.findOne({ key: key }));
}

export const reset = async (emitter = null) => {
  await collections.textures.remove({}, { multi: true });
  if(emitter !== null) {
    emitter.emit('textureUpdate');
  }
}