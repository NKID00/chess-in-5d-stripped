import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';

import GamePlayer from 'components/GamePlayer';

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
        <GamePlayer
          canControlWhite
          canControlBlack
          canImport
        />
      </ThemeProvider>
    );
  }
}
