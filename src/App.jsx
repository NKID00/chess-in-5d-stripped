import React from 'react';
import { HashRouter } from 'react-router-dom';

//Style and theme system from material ui
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

//Internationalization framework from lingui
import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import i18nInit from 'state/i18n';

//PWA installation framework
import ReactPWAInstallProvider from 'react-pwa-install';

//App specific event and state management
import EmitterContext from 'EmitterContext';
import * as muiTheme from 'state/theme'
import * as auth from 'network/auth';

//App components
import Main from 'route/Main';
import UpdateToast from 'route/UpdateToast';
import ConverseManager from 'route/ConverseManager';

//Available non-monospaced fonts
import '@fontsource/domine';
import '@fontsource/exo';
import '@fontsource/fira-sans';
import '@fontsource/eb-garamond';
import '@fontsource/merriweather';
import '@fontsource/newsreader';
import '@fontsource/open-sans';
import '@fontsource/playfair-display';
import '@fontsource/roboto-condensed';
import '@fontsource/roboto';
import '@fontsource/vollkorn';

//Available monospaced fonts
import '@fontsource/roboto-mono';

//Custom CSS for integration
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
                <ReactPWAInstallProvider>
                  <div>
                    <UpdateToast />
                    <Main />
                    <ConverseManager />
                  </div>
                </ReactPWAInstallProvider>
              </SnackbarProvider>
            </ThemeProvider>
          </EmitterContext.Provider>
        </I18nProvider>
      </HashRouter>
    );
  }
}
