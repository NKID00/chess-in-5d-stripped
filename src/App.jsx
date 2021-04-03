import React from 'react';
import { HashRouter } from 'react-router-dom';

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { messages } from 'locales/en/messages.js';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import EmitterContext from 'EmitterContext';
import muiTheme from 'components/theme';

import Main from 'route/Main';

import '@fontsource/roboto';
import '@fontsource/vollkorn';
import 'App.css';

const { createNanoEvents } = require('nanoevents');
const store = require('store');

i18n.load('en', messages);
if(typeof store.get('locale') === 'string') {
  i18n.activate(store.get('locale'));
}
else {
  i18n.activate('en');
}


export default class App extends React.Component {
  state = {
    muiTheme: muiTheme.get()
  };
  emitter = createNanoEvents();
  componentDidMount() {
    this.emitter.on('themeUpdate', () => {
      this.setState({
        muiTheme: muiTheme.get()
      });
    });
    this.emitter.on('localeUpdate', () => {
      i18n.activate(store.get('locale'));
    });
  }
  render() {
    return (
      <HashRouter>
        <CssBaseline />
        <I18nProvider i18n={i18n}>
          <EmitterContext.Provider value={this.emitter}>
            <ThemeProvider theme={createMuiTheme(this.state.muiTheme)}>
              <Main />
            </ThemeProvider>
          </EmitterContext.Provider>
        </I18nProvider>
      </HashRouter>
    );
  }
}
