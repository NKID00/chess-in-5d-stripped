import React from 'react';

import Button from '@material-ui/core/Button';

import { withSnackbar } from 'notistack';
import * as serviceWorker from 'utils/ServiceWorker';

const swUpdateAvailable = new Event('swupdateavailable');
const swOfflineReady = new Event('swofflineready');
const swInstalling = new Event('swinstalling');

//TODO Internationalization required here
class UpdateToast extends React.Component {
  installingToastKey = null;
  reg = null;
  updateToast() {
    //Removing installing indicator
    if(this.installingToastKey !== null) {
      this.props.closeSnackbar(this.installingToastKey);
      this.installingToastKey = null;
    }
    this.props.enqueueSnackbar('New version available', {
      variant: 'info',
      persist: true,
      action: (
        <Button onClick={() => {
          var regwaiting = this.reg.waiting;
          if(regwaiting) {
            regwaiting.postMessage({ type: 'SKIP_WAITING' });
            regwaiting.addEventListener('statechange', (e) => {
              if(e.target.state === 'activated') {
                window.location.reload();
              }
            });
          }
        }}>
          Update
        </Button>
      ),
      preventDuplicate: true,
    });
  }
  offlineToast() {
    //Removing installing indicator
    if(this.installingToastKey !== null) {
      this.props.closeSnackbar(this.installingToastKey);
      this.installingToastKey = null;
    }
    this.props.enqueueSnackbar('Content available offline', {
      variant: 'success',
      preventDuplicate: true,
    });
  }
  installingToast() {
    this.installingToastKey = this.props.enqueueSnackbar('Downloading...', {
      variant: 'info',
      preventDuplicate: true,
    });
  }
  componentDidMount() {
    this.updateToast = this.updateToast.bind(this);
    this.offlineToast = this.offlineToast.bind(this);
    window.addEventListener('swupdateavailable', this.updateToast);
    window.addEventListener('swofflineready', this.offlineToast);
    window.addEventListener('swinstalling', this.installingToast);
    serviceWorker.register({
      onUpdate: (reg) => {
        this.reg = reg;
        window.dispatchEvent(swUpdateAvailable);
      },
      onSuccess: () => { window.dispatchEvent(swOfflineReady); },
      onReady: (reg) => { if(reg.waiting !== null) {
        this.reg = reg;
        window.dispatchEvent(swUpdateAvailable);
      }},
      onUpdateFound: (reg) => {
        this.reg = reg;
        window.dispatchEvent(swInstalling);
      },
    });
  }
  componentWillUnmount() {
    window.removeEventListener('swupdateavailable', this.updateToast);
    window.removeEventListener('swofflineready', this.offlineToast);
    window.removeEventListener('swinstalling', this.installingToast);
  }
  render() { return <></>; }
}

export default withSnackbar(UpdateToast);
