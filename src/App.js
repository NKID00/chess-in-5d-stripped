import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '@rebass/preset';
import Chess from '5d-chess-js';

import Board from 'components/Board';

import 'fontsource-roboto';
import 'App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.chess = new Chess('1w. 1:e2:e3\n1b. 1:f7:f6\n2w. 2:Nb1<>1:b3\n2b. 1+1:a7:a6\n3w. 2+1:c2:c3\n3b. 2:Nb8:c6\n3b. 2+1:Nb8:c6\n4w. 3:Qd1:h5\n4w. 3+1:Qd1:c2#');
    this.chess.print();
    console.log(this.chess.board)
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Board boardObj={this.chess.board} />
      </ThemeProvider>
    );
  }
}
