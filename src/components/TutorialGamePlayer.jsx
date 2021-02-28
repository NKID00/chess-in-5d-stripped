import React from 'react';
import { withRouter, Redirect } from 'react-router';

import Options from 'Options';

import { withSnackbar } from 'notistack';
import GamePlayer from 'components/GamePlayer';
import Tutorial from 'components/Tutorial';

const deepcompare = require('deep-equal');

class TutorialGamePlayer extends React.Component {
  gameRef = React.createRef();
  state = {
    step: 0,
    disableNext: false,
    disablePrevious: false,
    redirectNext: false
  };
  componentDidMount() {
    this.setState({
      disableNext: (typeof this.props.tutorialArray[this.state.step].moveBuffer !== 'undefined')
    });
    var url = new URLSearchParams(this.props.location.search);
    var stepStr = url.get('step');
    if(stepStr) {
      this.setState({
        step: Number(stepStr),
        disableNext: (typeof this.props.tutorialArray[Number(stepStr)].moveBuffer !== 'undefined')
      });
    }
    Options.set('tutorial', { tutorialPopup: false });
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.step !== this.state.step) {
      var url = new URLSearchParams(this.props.location.search);
      var stepStr = url.get('step');
      if(Number(stepStr) !== this.state.step) {
        window.history.pushState({}, null, window.location.origin + '/#' + this.props.location.pathname + '?step=' + this.state.step);
      }
    }
    if(prevProps.location.search !== this.props.location.search) {
      var url = new URLSearchParams(this.props.location.search); // eslint-disable-line no-redeclare
      var stepStr = url.get('step'); // eslint-disable-line no-redeclare
      if(Number(stepStr) !== this.state.step) {
        this.setState({ step: Number(stepStr) });
      }
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
          typeof this.props.tutorialArray[this.state.step] !== 'undefined' ?
          this.props.tutorialArray[this.state.step].import
        :
          undefined
        }
        onSubmit={() => {
          if(this.gameRef) {
            var tutorialBuffer = this.props.tutorialArray[this.state.step].moveBuffer;
            var valid = false;
            if(typeof tutorialBuffer !== 'undefined') {
              var gameBuffer = this.gameRef.current.state.moveBuffer;
              valid = tutorialBuffer.length === gameBuffer.length;
              for(var i = 0;valid && i < tutorialBuffer.length;i++) {
                delete gameBuffer[i].realEnd;
                if(gameBuffer[i].castling !== null) {
                  delete gameBuffer[i].castling.realEnd;
                }
                if(!deepcompare(tutorialBuffer[i], gameBuffer[i])) {
                  valid = false;
                }
              }
            }
            if(valid) {
              this.setState({
                step: this.state.step + 1,
                disableNext: (typeof this.props.tutorialArray[this.state.step + 1].moveBuffer !== 'undefined')
              });
            }
            else {
              if(Array.isArray(this.props.tutorialArray) &&
                typeof this.props.tutorialArray[this.state.step] !== 'undefined' &&
                typeof this.props.tutorialArray[this.state.step].import !== 'undefined'
              ) {
                this.props.enqueueSnackbar('Moves are incorrect!', {variant: 'error'});
                this.gameRef.current.import(this.props.tutorialArray[this.state.step].import);
              }
            }
          }
        }}
        onMove={async () => {
          if(this.gameRef) {
            this.setState({
              disableNext: await (async () => {
                var tutorialBuffer = this.props.tutorialArray[this.state.step].moveBuffer;
                var valid = true;
                if(typeof tutorialBuffer !== 'undefined') {
                  var gameBuffer = await this.gameRef.current.chess.moveBuffer;
                  valid = tutorialBuffer.length === gameBuffer.length;
                  for(var i = 0;valid && i < tutorialBuffer.length;i++) {
                    delete gameBuffer[i].realEnd;
                    if(gameBuffer[i].castling !== null) {
                      delete gameBuffer[i].castling.realEnd;
                    }
                    if(!deepcompare(tutorialBuffer[i], gameBuffer[i])) {
                      valid = false;
                    }
                  }
                }
                return !valid;
              })()
            });
          }
        }}
        onUndo={async () => {
          if(this.gameRef) {
            this.setState({
              disableNext: await (async () => {
                var tutorialBuffer = this.props.tutorialArray[this.state.step].moveBuffer;
                var valid = true;
                if(typeof tutorialBuffer !== 'undefined') {
                  var gameBuffer = await this.gameRef.current.chess.moveBuffer;
                  valid = tutorialBuffer.length === gameBuffer.length;
                  for(var i = 0;valid && i < tutorialBuffer.length;i++) {
                    delete gameBuffer[i].realEnd;
                    if(gameBuffer[i].castling !== null) {
                      delete gameBuffer[i].castling.realEnd;
                    }
                    if(!deepcompare(tutorialBuffer[i], gameBuffer[i])) {
                      valid = false;
                    }
                  }
                }
                return !valid;
              })()
            });
          }
        }}
        onImport={async () => {
          if(this.gameRef) {
            this.setState({
              disableNext: await (async () => {
                var tutorialBuffer = this.props.tutorialArray[this.state.step].moveBuffer;
                var valid = true;
                if(typeof tutorialBuffer !== 'undefined') {
                  var gameBuffer = await this.gameRef.current.chess.moveBuffer;
                  valid = tutorialBuffer.length === gameBuffer.length;
                  for(var i = 0;valid && i < tutorialBuffer.length;i++) {
                    delete gameBuffer[i].realEnd;
                    if(gameBuffer[i].castling !== null) {
                      delete gameBuffer[i].castling.realEnd;
                    }
                    if(!deepcompare(tutorialBuffer[i], gameBuffer[i])) {
                      valid = false;
                    }
                  }
                }
                return !valid;
              })()
            });
          }
        }}
      >
        {this.state.redirectNext ?
          <Redirect push to={this.props.next} />
        :
          <></>
        }
        <Tutorial
          step={this.state.step}
          tutorialArray={this.props.tutorialArray}
          disableNext={this.state.disableNext}
          onNext={async () => {
            if(this.state.step >= this.props.tutorialArray.length - 1) {
              this.setState({redirectNext: true});
            }
            else {
              if(typeof this.props.tutorialArray[this.state.step].moveBuffer !== 'undefined') {
                if(this.gameRef && await this.gameRef.current.state.submittable) {
                  this.gameRef.current.submit();
                }
              }
              else {
                this.setState({
                  step: this.state.step + 1,
                  disableNext: await (async () => {
                    var tutorialBuffer = this.props.tutorialArray[this.state.step + 1].moveBuffer;
                    var valid = true;
                    if(typeof tutorialBuffer !== 'undefined') {
                      var gameBuffer = await this.gameRef.current.chess.moveBuffer;
                      valid = tutorialBuffer.length === gameBuffer.length;
                      for(var i = 0;valid && i < tutorialBuffer.length;i++) {
                        delete gameBuffer[i].realEnd;
                        if(gameBuffer[i].castling !== null) {
                          delete gameBuffer[i].castling.realEnd;
                        }
                        if(!deepcompare(tutorialBuffer[i], gameBuffer[i])) {
                          valid = false;
                        }
                      }
                    }
                    return !valid;
                  })()
                });
              }
            }
          }}
          disablePrevious={this.state.step <= 0 || this.state.disablePrevious}
          onPrevious={async () => {
            this.setState({
              step: this.state.step - 1,
              disableNext: await (async () => {
                var tutorialBuffer = this.props.tutorialArray[this.state.step - 1].moveBuffer;
                var valid = true;
                if(typeof tutorialBuffer !== 'undefined') {
                  var gameBuffer = await this.gameRef.current.chess.moveBuffer;
                  valid = tutorialBuffer.length === gameBuffer.length;
                  for(var i = 0;valid && i < tutorialBuffer.length;i++) {
                    delete gameBuffer[i].realEnd;
                    if(gameBuffer[i].castling !== null) {
                      delete gameBuffer[i].castling.realEnd;
                    }
                    if(!deepcompare(tutorialBuffer[i], gameBuffer[i])) {
                      valid = false;
                    }
                  }
                }
                return !valid;
              })()
            });
          }}
        />
      </GamePlayer>
    );
  }
}

export default withSnackbar(withRouter(TutorialGamePlayer));
