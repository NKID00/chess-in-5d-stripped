const path = require('path');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        modules: [path.resolve(__dirname, 'src/.5d-chess-workspace'), 'node_modules']
      }
    }
  }
}