import React from 'react';

import { withSnackbar } from 'notistack';
import * as serviceWorker from 'serviceWorker';

const swUpdateAvailable = new Event('swupdateavailable');
const swOfflineReady = new Event('swofflineready');

class UpdateToast extends React.Component {
  updateToast() {
    this.props.enqueueSnackbar('Update available, refresh to continue.', {variant: 'info'});
  }
  offlineToast() {
    this.props.enqueueSnackbar('All content downloaded, now available offline.', {variant: 'success'});
  }
  componentDidMount() {
    this.updateToast = this.updateToast.bind(this);
    this.offlineToast = this.offlineToast.bind(this);
    window.addEventListener('swupdateavailable', this.updateToast);
    window.addEventListener('swofflineready', this.offlineToast);
    serviceWorker.register({
      onUpdate: () => { window.dispatchEvent(swUpdateAvailable); },
      onSuccess: () => { window.dispatchEvent(swOfflineReady); }
    });
  }
  componentWillUnmount() {
    window.removeEventListener('swupdateavailable', this.updateToast);
    window.removeEventListener('swofflineready', this.offlineToast);
  }
  render() { return <></>; }
}

export default withSnackbar(UpdateToast);