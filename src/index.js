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

const swUpdateAvailable = new Event('swupdateavailable');
const swOfflineReady = new Event('swofflineready');
serviceWorker.register({
  onUpdate: () => { window.dispatchEvent(swUpdateAvailable); },
  onSuccess: () => { window.dispatchEvent(swOfflineReady); }
});
