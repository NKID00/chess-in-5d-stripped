import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';

import Wrapper from 'components/Wrapper';

import 'fontsource-roboto';
import 'App.css';

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper />
      </ThemeProvider>
    );
  }
}
