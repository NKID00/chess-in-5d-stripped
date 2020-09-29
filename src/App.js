import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';

import GamePlayer from 'components/GamePlayer';

import 'fontsource-roboto';
import 'App.css';

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <GamePlayer />
      </ThemeProvider>
    );
  }
}
