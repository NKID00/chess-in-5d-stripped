import React from 'react';
import { HashRouter } from 'react-router-dom';

import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import { SnackbarProvider } from 'notistack';

import Menu from 'uiTree/Menu';
import Game from 'uiTree/Game';
import UpdateToast from 'components/UpdateToast';

import 'fontsource-roboto';
import 'App.css';

export default class App extends React.Component {
  resizeListener = () => {};
  componentDidMount() {
    this.resizeListener = () => {
      this.forceUpdate();
    };
    window.addEventListener('resize', this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }
  render() {
    return (
      <HashRouter basename={
        window.location.hostname === 'alexbay218.gitlab.io' ?
          '/chess-in-5d'
        :
          '/'
        } >
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={2}>
            <UpdateToast />
            <Menu />
            <Game />
          </SnackbarProvider>
        </ThemeProvider>
      </HashRouter>
    );
  }
}
