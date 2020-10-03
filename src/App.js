import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import { SnackbarProvider } from 'notistack';

import GamePlayer from 'components/GamePlayer';
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
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={2}>
          <UpdateToast />
          <GamePlayer
            canControlWhite
            canControlBlack
            canImport
          />
        </SnackbarProvider>
      </ThemeProvider>
    );
  }
}
