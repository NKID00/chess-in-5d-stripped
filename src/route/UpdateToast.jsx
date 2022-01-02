import React from 'react';

import Button from '@material-ui/core/Button';

import { withSnackbar } from 'notistack';
import * as serviceWorker from 'utils/ServiceWorkerRegistration';
import * as settings from 'state/settings';

const swUpdateAvailable = new Event('swupdateavailable');
const swOfflineReady = new Event('swofflineready');

//TODO Internationalization required here
class UpdateToast extends React.Component {
  installingToastKey = null;
  reg = null;
  updateToast() {
    let regwaiting = this.reg.waiting;
    if(regwaiting) {
      regwaiting.addEventListener('statechange', (e) => {
        if(e.target.state === 'activated') {
          window.location.reload();
        }
      });
      if(settings.get().autoUpdate) {
        this.props.enqueueSnackbar('Auto Updating...', {
          variant: 'info',
          persist: true,
          preventDuplicate: true,
        });
        regwaiting.postMessage({ type: 'SKIP_WAITING' });
      }
      else {
        this.props.enqueueSnackbar('New version available', {
          variant: 'info',
          persist: true,
          action: (
            <Button onClick={() => {
              let regwaiting = this.reg.waiting;
              if(regwaiting) {
                regwaiting.postMessage({ type: 'SKIP_WAITING' });
              }
            }}>
              Update
            </Button>
          ),
          preventDuplicate: true,
        });
      }
    }
  }
  offlineToast() {
    this.props.enqueueSnackbar('Content available offline', {
      variant: 'success',
      preventDuplicate: true,
    });
  }
  componentDidMount() {
    this.updateToast = this.updateToast.bind(this);
    this.offlineToast = this.offlineToast.bind(this);
    window.addEventListener('swupdateavailable', this.updateToast);
    window.addEventListener('swofflineready', this.offlineToast);
    serviceWorker.register({
      onUpdate: (reg) => {
        this.reg = reg;
        window.dispatchEvent(swUpdateAvailable);
      },
      onSuccess: () => { window.dispatchEvent(swOfflineReady); },
      onReady: (reg) => {
        if(reg.waiting !== null) {
          this.reg = reg;
          window.dispatchEvent(swUpdateAvailable);
        }
      },
    });
  }
  componentWillUnmount() {
    window.removeEventListener('swupdateavailable', this.updateToast);
    window.removeEventListener('swofflineready', this.offlineToast);
  }
  render() { return <></>; }
}

export default withSnackbar(UpdateToast);
