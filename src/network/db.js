const Datastore = require('nedb-promises');

var collections = null;

export const init = () => {
  if(collections === null) {
    collections = {
      textures: Datastore.create({ filename: 'textures', autoload: true }),
      users: Datastore.create({ filename: 'users', autoload: true }),
      games: Datastore.create({ filename: 'games', autoload: true }),
      sessions: Datastore.create({ filename: 'sessions', autoload: true }),
      rankings: Datastore.create({ filename: 'rankings', autoload: true })
    };
    collections.users.ensureIndex({ fieldName: 'username' });
    collections.games.ensureIndex({ fieldName: 'id' });
    collections.sessions.ensureIndex({ fieldName: 'id' });
    collections.rankings.ensureIndex({ fieldName: 'id' });
  }
  return collections;
}