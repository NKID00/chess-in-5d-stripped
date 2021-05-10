var collections = require('network/db').init();

export const set = async (key, texture, emitter = null) => {
  var newTexture = {
    key: key,
    texture: texture
  };
  await collections.textures.update({ key: key }, { $set: newTexture }, { upsert: true });
  if(emitter !== null) {
    emitter.emit('textureUpdate');
  }
}

export const get = async (key) => {
  return (await collections.textures.findOne({ key: key }));
}