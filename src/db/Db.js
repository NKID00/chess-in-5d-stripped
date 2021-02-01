const Datastore = require('nedb-promises');

var collections = null;

exports.init = () => {
  if(collections === null) {
    collections = {
      users: Datastore.create({ autoload: true }),
      games: Datastore.create({ autoload: true }),
      sessions: Datastore.create({ autoload: true }),
      rankings: Datastore.create({ autoload: true }),
      secrets: Datastore.create({ autoload: true })
    };
  }
  return collections;
};
