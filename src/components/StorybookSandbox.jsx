import React from 'react';
import { HashRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';

import EmitterContext from 'utils/EmitterContext';
import * as muiTheme from 'state/theme';
import i18nInit from 'state/i18n';

import 'components/FontLists';

import 'App.css';

const { createNanoEvents } = require('nanoevents');

export default class StorybookSandbox extends React.Component {
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
  }
  render() {
    return (
      <HashRouter>
        <CssBaseline />
        <I18nProvider i18n={i18n}>
          <EmitterContext.Provider value={this.emitter}>
            <ThemeProvider theme={createMuiTheme(this.state.muiTheme)}>
              <SnackbarProvider maxSnack={2}>
                {this.props.children}
              </SnackbarProvider>
            </ThemeProvider>
          </EmitterContext.Provider>
        </I18nProvider>
      </HashRouter>
    );
  }
}
