import React from 'react';
import { withRouter } from 'react-router';

import GamePlayer from 'components/GamePlayer';

class LocalAnalyzer extends React.Component {
  state = {
    import: ''
  };
  componentDidMount() {
    var url = new URLSearchParams(this.props.location.search);
    var importStr = url.get('import');
    this.setState({import: importStr});
  }
  render() {
    return (
      <GamePlayer
        canImport
        canAnalyze
        canControlWhite
        canControlBlack
        defaultImport={this.state.import}
      />
    );
  }
}

export default withRouter(LocalAnalyzer);