import React from 'react';
import ReactDOM from 'react-dom';

import App from 'App';

const store = require('store');

//Check if data from old version exists (clear if yes)
if(typeof store.get('peerjs') === 'object') {
  store.clearAll();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

