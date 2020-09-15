import React from 'react';
import ReactDOM from 'react-dom';

import 'index.css';
import App from 'App';
import * as serviceWorker from 'serviceWorker';

require('module-alias/register');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
