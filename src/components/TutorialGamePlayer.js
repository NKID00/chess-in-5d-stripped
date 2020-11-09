import React from 'react';
import { withRouter } from 'react-router';

import GamePlayer from 'components/GamePlayer';
import Tutorial from 'components/Tutorial';

const deepcompare = require('deep-compare');

class TutorialGamePlayer extends React.Component {
  gameRef = React.createRef();
  state = {
    step: 0,
    disableNext: false,
    disablePrevious: false
  };
  componentDidMount() {
    if(this.gameRef) {
      this.setState({
        disableNext: (this.state.step + 1 < this.props.tutorialArray.length && typeof this.props.tutorialArray[this.state.step + 1].moveBuffer !== 'undefined')
      });
    }
    var url = new URLSearchParams(this.props.location.search);
    var stepStr = url.get('step');
    if(stepStr) {
      this.setState({step: Number(stepStr)});
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.step !== this.state.step) {
      window.history.pushState({}, null, window.location.origin + '/#' + this.props.location.pathname + '?step=' + this.state.step);
    }
  }
  render() {
    return (
      <GamePlayer
        ref={this.gameRef}
        canImport
        canAnalyze
        canControlWhite
        canControlBlack
        flip={Array.isArray(this.props.tutorialArray) &&
          typeof this.props.tutorialArray[this.state.step] !== 'undefined' &&
          typeof this.props.tutorialArray[this.state.step].flip !== 'undefined' ?
          this.props.tutorialArray[this.state.step].flip
        :
          false
        }
        variant={this.props.variant}
        defaultImport={Array.isArray(this.props.tutorialArray) &&
          typeof this.props.tutorialArray[this.state.step] !== 'undefined' &&
          typeof this.props.tutorialArray[this.state.step].import !== 'undefined' ?
          this.props.tutorialArray[this.state.step].import
        :
          ''
        }
        onSubmit={() => {
          if(this.gameRef) {
            if(deepcompare(this.props.tutorialArray[this.state.step].moveBuffer, this.gameRef.current.state.moveBuffer)) {
              this.setState({
                step: this.state.step + 1,
                disableNext: (this.state.step + 1 < this.props.tutorialArray.length && typeof this.props.tutorialArray[this.state.step + 1].moveBuffer !== 'undefined')
              });
            }
            else {
              this.gameRef.current.revert();
            }
          }
        }}
      >
        <Tutorial
          step={this.state.step}
          tutorialArray={this.props.tutorialArray}
          disableNext={this.state.step >= this.props.tutorialArray.length - 1 || this.state.disableNext}
          onNext={() => {
            if(typeof this.props.tutorialArray[this.state.step].moveBuffer !== 'undefined') {
              this.gameRef.current.submit();
            }
            else {
              this.setState({step: this.state.step + 1});
            }
          }}
          disablePrevious={this.state.step <= 0 || this.state.disablePrevious}
          onPrevious={() => {
            this.setState({step: this.state.step - 1});
          }}
        />
      </GamePlayer>
    );
  }
}

export default withRouter(TutorialGamePlayer);