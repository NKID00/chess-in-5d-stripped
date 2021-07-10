import React from 'react';

import EmitterContext from 'utils/EmitterContext';
import * as settings from 'state/settings';

const eruda = require('eruda');

export default class ConverseManager extends React.Component {
  static contextType = EmitterContext;
  isInitialized = false;
  erudaInit() {
    if(settings.get().eruda && !this.isInitialized) {
      eruda.init();
      this.isInitialized = true;
    }
    if(!settings.get().eruda && this.isInitialized) {
      eruda.destroy();
      this.isInitialized = false;
    }
  }
  componentDidMount() {
    this.erudaInit();
    //Update state if settings is changed
    this.settingsListener = this.context.on('settingsUpdate', () => {
      this.erudaInit();
    });
  }
  componentWillUnmount() {
    //Stop listening to settings changes
    if(typeof this.settingsListener === 'function') { this.settingsListener(); }
  }
  render() {
    return (
      <></>
    );
  }
}