import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import 'index.css';
import App from 'App';
import * as serviceWorker from 'serviceWorker';

Modal.setAppElement('#root')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
