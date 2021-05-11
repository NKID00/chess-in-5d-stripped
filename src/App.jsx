import React from 'react';
import { HashRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import AddToHomeScreen from '@ideasio/add-to-homescreen-react';

import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

import EmitterContext from 'EmitterContext';
import * as muiTheme from 'state/theme';
import i18nInit from 'state/i18n';
import * as auth from 'network/auth';

import Main from 'route/Main';
import UpdateToast from 'route/UpdateToast';
import ConverseManager from 'route/ConverseManager';

import '@fontsource/domine';
import '@fontsource/exo';
import '@fontsource/fira-sans';
import '@fontsource/merriweather';
import '@fontsource/newsreader';
import '@fontsource/open-sans';
import '@fontsource/playfair-display';
import '@fontsource/roboto-condensed';
import '@fontsource/roboto';
import '@fontsource/vollkorn';
import 'App.css';

const { createNanoEvents } = require('nanoevents');

export default class App extends React.Component {
  state = {
    muiTheme: muiTheme.get()
  };
  emitter = createNanoEvents();
  componentDidMount() {
    i18nInit(this.emitter);
    this.emitter.on('themeUpdate', () => {
      this.setState({
        muiTheme: muiTheme.get()
      });
    });
    auth.init(this.emitter);
  }
  render() {
    return (
      <HashRouter>
        <CssBaseline />
        <I18nProvider i18n={i18n}>
          <EmitterContext.Provider value={this.emitter}>
            <ThemeProvider theme={createMuiTheme(this.state.muiTheme)}>
              <SnackbarProvider maxSnack={2}>
                <AddToHomeScreen />
                <UpdateToast />
                <Main />
                <ConverseManager />
              </SnackbarProvider>
            </ThemeProvider>
          </EmitterContext.Provider>
        </I18nProvider>
      </HashRouter>
    );
  }
}
