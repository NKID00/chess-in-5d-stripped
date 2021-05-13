import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import NotationLine from 'components/Player/Notation/NotationLine';

import EmitterContext from 'EmitterContext';
import * as crConfig from 'state/config';
import * as muiTheme from 'state/theme';

export default class Notation extends React.Component {
  static contextType = EmitterContext;
  state = {
    config: crConfig.get(),
    theme: muiTheme.get(),
    notationArr: [],
  };
  extractNotationArr() {
    var res = [];
    if(typeof this.props.notation === 'string') {
      var tmpNotation = this.props.notation.slice();
      tmpNotation = tmpNotation.replace(/\[[^\]]*\]/g, '');
      tmpNotation = tmpNotation.replace(/;\s*([^\n]*)\n/g, '{$1}\n');
      tmpNotation = tmpNotation.replace(/([^\s]){/g, '$1 {');
      tmpNotation = tmpNotation.replace(/}([^\s])/g, '} $1');
      //TODO: Remove newlines between {} style comments
      tmpNotation = tmpNotation.replace(/\s+(\d*\.)/g, '\n$1');
      var tmpNotationArr = tmpNotation.split('\n');
      for(var i = 0;i < tmpNotationArr.length;i++) {
        if(tmpNotationArr[i].length > 0) {
          res.push(tmpNotationArr[i]);
        }
      }
    }

    //Check if update is needed
    var updateNeeded = true;
    if(this.state.notationArr.length === res.length) {
      updateNeeded = false;
      for(var i = 0;!updateNeeded && i < res.length;i++) { // eslint-disable-line no-redeclare
        if(res[i] !== this.state.notationArr[i]) {
          updateNeeded = true;
        }
      }
    }

    //Update state if needed
    if(updateNeeded) {
      this.setState({ notationArr: res });
    }
  }
  componentDidMount() {
    //Update state if config settings are changed
    this.configListener = this.context.on('configUpdate', () => {
      this.setState({
        config: crConfig.get()
      });
    });
    //Update state if theme settings are changed
    this.themeListener = this.context.on('themeUpdate', () => {
      this.setState({
        theme: muiTheme.get()
      });
    });
    this.extractNotationArr();
  }
  componentDidUpdate(prevProps) {
    if(this.props.notation !== prevProps.notation) {
      this.extractNotationArr();
    }
  }
  componentWillUnmount() {
    //Stop listening to config setting changes
    if(typeof this.configListener === 'function') { this.configListener(); }
    //Stop listening to theme setting changes
    if(typeof this.themeListener === 'function') { this.themeListener(); }
  }
  render() {
    return (
      <Card>
        <CardContent>
          <Grid container spacing={0}>
            {this.state.notationArr.map((e, i) => {
              return (
                <Grid key={i} item xs={12}>
                  <NotationLine 
                    notationLine={e}
                    fontFamily={this.state.theme.extra.notation.fontFamily}
                    fontSize={this.state.theme.extra.notation.fontSize}
                    activateTimelineToken={this.state.config.notation.activateTimelineToken.show}
                    activateTimelineTokenBackgroundColor={this.state.theme.extra.notation.activateTimelineToken.backgroundColor}
                    activateTimelineTokenColor={this.state.theme.extra.notation.activateTimelineToken.color}
                    newTimelineToken={this.state.config.notation.newTimelineToken.show}
                    newTimelineTokenBackgroundColor={this.state.theme.extra.notation.newTimelineToken.backgroundColor}
                    newTimelineTokenColor={this.state.theme.extra.notation.newTimelineToken.color}
                    onClick={(str) => {
                      var res = '';
                      for(var j = 0;j < i && j < this.state.notationArr.length;j++) {
                        res += this.state.notationArr[j] + '\n';
                      }
                      res += str;
                      if(typeof this.props.onClick === 'function') {
                        this.props.onClick(res.trim());
                      }
                    }}
                  />
                  {i + 1 < this.state.notationArr.length ? <Divider /> : <></>}
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
