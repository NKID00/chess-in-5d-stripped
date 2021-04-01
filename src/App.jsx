import React from 'react';
import { HashRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';

import 'fontsource-roboto';
import 'App.css';

export default class App extends React.Component {
  constructor() {
    this.state = {
      muiTheme: {}
    };
  }
  render() {
    return (
      <HashRouter>
        <CssBaseline>
          <ThemeProvider theme={createMuiTheme(this.state.muiTheme)}>
          </ThemeProvider>
        </CssBaseline>        
      </HashRouter>
    );
  }
}
