const Datastore = require('nedb-promises');

var collections = null;

export const init = () => {
  if(collections === null) {
    collections = {
      audio: Datastore.create({ filename: 'audio', autoload: true }),
      textures: Datastore.create({ filename: 'textures', autoload: true }),
      users: Datastore.create({ filename: 'users', autoload: true }),
      pastSessions: Datastore.create({ filename: 'pastSessions', autoload: true }),
      currentSessions: Datastore.create({ filename: 'currentSessions', autoload: true }),
      sessionRequests: Datastore.create({ filename: 'sessionRequests', autoload: true }),
      sessionCache: Datastore.create({ inMemoryOnly: true }),
      rankings: Datastore.create({ filename: 'rankings', autoload: true })
    };
    collections.users.ensureIndex({ fieldName: 'username' });
    collections.pastSessions.ensureIndex({ fieldName: 'id' });
    collections.currentSessions.ensureIndex({ fieldName: 'id' });
    collections.sessionRequests.ensureIndex({ fieldName: 'id' });
    collections.sessionCache.ensureIndex({ fieldName: 'id' });
    collections.rankings.ensureIndex({ fieldName: 'id' });
  }
  return collections;
}