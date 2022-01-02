import React from 'react';
import ReactDOM from 'react-dom';

import App from 'App';

import * as version from 'state/version';

version.init();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

