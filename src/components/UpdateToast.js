import React from 'react';

import Button from '@material-ui/core/Button';

import { withSnackbar } from 'notistack';
import * as serviceWorker from 'serviceWorker';

const swUpdateAvailable = new Event('swupdateavailable');
const swOfflineReady = new Event('swofflineready');

class UpdateToast extends React.Component {
  reg = null;
  updateToast() {
    this.props.enqueueSnackbar('New version available', {
      variant: 'info',
      persist: true,
      action: (
        <Button onClick={() => {
          var regwaiting = this.reg.waiting;
          if(regwaiting) {
            regwaiting.postMessage({ type: 'SKIP_WAITING' });
            regwaiting.addEventListener('statechange', (e) => {
              if (e.target.state === 'activated') {
                window.location.reload();
              }
            });
          }
        }}>
          Update
        </Button>
      )
    });
  }
  offlineToast() {
    this.props.enqueueSnackbar('Content available offline', {variant: 'success'});
  }
  componentDidMount() {
    this.updateToast = this.updateToast.bind(this);
    this.offlineToast = this.offlineToast.bind(this);
    window.addEventListener('swupdateavailable', this.updateToast);
    window.addEventListener('swofflineready', this.offlineToast);
    serviceWorker.register({
      onUpdate: (reg) => { this.reg = reg; window.dispatchEvent(swUpdateAvailable); },
      onSuccess: () => { window.dispatchEvent(swOfflineReady); },
      onReady: (reg) => { if(reg.waiting !== null) {
        this.reg = reg;
        window.dispatchEvent(swUpdateAvailable);
      }}
    });
  }
  componentWillUnmount() {
    window.removeEventListener('swupdateavailable', this.updateToast);
    window.removeEventListener('swofflineready', this.offlineToast);
  }
  render() { return <></>; }
}

export default withSnackbar(UpdateToast);
