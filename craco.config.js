const CracoWorkboxPlugin = require('craco-workbox');
const path = require('path');

module.exports = {
  plugins: [{
    plugin: CracoWorkboxPlugin
  }],
  webpack: {
    configure: {
      resolve: {
        modules: [path.resolve(__dirname, 'src/.5d-chess-workspace'), 'node_modules']
      }
    }
  }
}