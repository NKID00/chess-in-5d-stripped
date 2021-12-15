import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import GetAppIcon from '@material-ui/icons/GetApp';

import NotationLine from 'components/Player/Notation/NotationLine';
import ExportNotation from 'components/Player/Notation/ExportNotation';

import HighlightNotationWorker from 'workerize-loader!components/Player/Notation/HighlightNotationWorker'; // eslint-disable-line import/no-webpack-loader-syntax
import EmitterContext from 'utils/EmitterContext';
import * as crConfig from 'state/config';
import * as muiTheme from 'state/theme';

import * as PIXI from 'pixi.js';

const highlightNotationWorker = new HighlightNotationWorker();

export default class Notation extends React.Component {
  static contextType = EmitterContext;
  state = {
    openExportModal: false,
    config: crConfig.get(),
    theme: muiTheme.get(),
    notationArr: [],
    highlightNotationSegment: null,
  };
  async extractHighlightNotation(notationArr) {
    if(Array.isArray(notationArr) && typeof this.props.notation === 'string' && typeof this.props.highlightNotation === 'string') {
      try {
        var highlightNotationSegment = (await highlightNotationWorker.extractHighlightNotation(notationArr, this.props.notation, this.props.highlightNotation));
        this.setState({
          highlightNotationSegment: highlightNotationSegment
        });
      }
      catch(err) {}
    }
  }
  extractNotationArr() {
    var res = [];
    var resWithTags = [];
    //Process notation into string arrays
    if(typeof this.props.notation === 'string') {
      var tmpNotation = this.props.notation.slice();
      tmpNotation = tmpNotation.replace(/;\s*([^\n]*)\n/g, '{$1}\n');
      tmpNotation = tmpNotation.replace(/([^\s]){/g, '$1 {');
      tmpNotation = tmpNotation.replace(/}([^\s])/g, '} $1');
      tmpNotation = tmpNotation.replace(/\r\n/g, '\n');
      //Remove comments
      var commentMode = false;
      for(var i = 0;i < tmpNotation.length;i++) {
        if(tmpNotation[i] === '{') {
          commentMode = true;
          tmpNotation = tmpNotation.substring(0,i) + tmpNotation.substring(i + 1);
          i--;
        }
        else if(tmpNotation[i] === '}') {
          commentMode = false;
          tmpNotation = tmpNotation.substring(0,i) + tmpNotation.substring(i + 1);
          i--;
        }
        else if(commentMode && typeof tmpNotation[i] === 'string') {
          tmpNotation = tmpNotation.substring(0,i) + tmpNotation.substring(i + 1);
          i--;
        }
      }
      tmpNotation = tmpNotation.replace(/\s+(\d*\.)/g, '\n$1');
      var tmpNotationArr = tmpNotation.split('\n');
      for(var i = 0;i < tmpNotationArr.length;i++) { // eslint-disable-line no-redeclare
        if(tmpNotationArr[i].length > 0) {
          resWithTags.push(tmpNotationArr[i]);
        }
      }
      tmpNotation = tmpNotation.replace(/\[[^\]]*\]/g, '');
      tmpNotationArr = tmpNotation.split('\n');
      for(var i = 0;i < tmpNotationArr.length;i++) { // eslint-disable-line no-redeclare
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

    //Look for highlights
    this.extractHighlightNotation(resWithTags);
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
    if(this.props.highlightNotation !== prevProps.highlightNotation) {
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
      <Box p={1} style={{ height: '100%' }}>
        <Box className={PIXI.utils.isMobile.any ? 'RGL-Drag-Cancel' : ''} style={{ overflowY: 'auto', height: '100%' }}>
          <Box  style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Grid container spacing={0} style={{ display: 'block', flex: 1 }}>
              {this.state.notationArr.map((e, i) => {
                return (
                  <Grid key={i} item xs={12}>
                    <NotationLine 
                      notationLine={e}
                      fontFamily={this.state.theme.extra.notation.fontFamily}
                      fontSize={this.state.theme.extra.notation.fontSize}
                      newPresentToken={this.state.config.notation.newPresentToken.show}
                      newPresentTokenBackgroundColor={this.state.theme.extra.notation.newPresentToken.backgroundColor}
                      newPresentTokenColor={this.state.theme.extra.notation.newPresentToken.color}
                      newTimelineToken={this.state.config.notation.newTimelineToken.show}
                      newTimelineTokenBackgroundColor={this.state.theme.extra.notation.newTimelineToken.backgroundColor}
                      newTimelineTokenColor={this.state.theme.extra.notation.newTimelineToken.color}
                      highlightNotationSegment={this.state.highlightNotationSegment}
                      highlightSize={this.state.theme.extra.notation.highlight.size}
                      highlightColor={this.state.theme.extra.notation.highlight.color}
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
            <Box width={1} mt={1} style={{ flexBasis: 'auto' }}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                startIcon={<GetAppIcon />}
                onClick={() => { this.setState({ openExportModal: true }); }}
              >
                <Trans>Export Game</Trans>
              </Button>
            </Box>
          </Box>
        </Box>
        <ExportNotation
          notation={this.props.notation}
          open={this.state.openExportModal}
          onClose={() => { this.setState({ openExportModal: false }); }}
        />
      </Box>
    );
  }
}
