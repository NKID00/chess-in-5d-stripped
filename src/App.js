import React from 'react';
import { HashRouter } from 'react-router-dom';

import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import { SnackbarProvider } from 'notistack';
import { Howler } from 'howler';

import Menu from 'uiTree/Menu';
import Game from 'uiTree/Game';
import Tutorial from 'uiTree/Tutorial';
import UpdateToast from 'components/UpdateToast';
import Music from 'components/Music';

import 'fontsource-roboto';
import 'App.css';

export default class App extends React.Component {
  resizeListener = () => {
    this.forceUpdate();
  };
  visibilityListener = () => {
    const state = document.visibilityState;
    if(state === "hidden") {
      Howler.mute(true);
    }
    if(state === "visible") {
      Howler.mute(false);
    }
  };
  componentDidMount() {
    this.resizeListener = () => {
      this.forceUpdate();
    };
    window.addEventListener('resize', this.resizeListener);
    window.addEventListener('visibilitychange', this.visibilityListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
    window.removeEventListener('visibilitychange', this.visibilityListener);
  }
  render() {
    return (
      <HashRouter>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={2}>
            <UpdateToast />
            <Music />
            <Menu />
            <Game />
            <Tutorial />
          </SnackbarProvider>
        </ThemeProvider>
      </HashRouter>
    );
  }
}
