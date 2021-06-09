import React from 'react';

import Box from '@material-ui/core/Box';

import NotationSegment from 'components/Player/Notation/NotationLine/NotationSegment';

export default class NotationLine extends React.Component {
  state = {
    notationArrWhite: [],
    notationArrBlack: [],
  };
  extractNotationArr() {
    var resWhite = [];
    var resBlack = [];
    if(typeof this.props.notationLine === 'string') {
      var tmpNotation = this.props.notationLine.slice();
      var tmpNotationArr = tmpNotation.split(' ');
      var whiteMode = true;
      for(var i = 0;i < tmpNotationArr.length;i++) {
        if(whiteMode && tmpNotationArr[i] === '/') {
          whiteMode = false;
        }
        if(tmpNotationArr[i].length > 0) {
          //Checking if in comment mode
          if(tmpNotationArr[i].includes('{')) {
            var comment = tmpNotationArr[i].slice();
            var commentDone = tmpNotationArr[i].includes('}');
            while(!commentDone && i + 1 < tmpNotationArr.length) {
              i++;
              comment += ' ' + tmpNotationArr[i];
              commentDone = tmpNotationArr[i].includes('}');
            }
            if(!comment.includes('}')) {
              comment += '}';
            }

            if(whiteMode) {
              resWhite.push(comment);
            }
            else {
              resBlack.push(comment);
            }
          }
          else {
            if(whiteMode) {
              resWhite.push(tmpNotationArr[i]);
            }
            else {
              resBlack.push(tmpNotationArr[i]);
            }
          }
        }
      }
    }

    //Check if update is needed
    var updateNeeded = true;
    if(this.state.notationArrWhite.length === resWhite.length) {
      updateNeeded = false;
      for(var i = 0;!updateNeeded && i < resWhite.length;i++) { // eslint-disable-line no-redeclare
        if(resWhite[i] !== this.state.notationArrWhite[i]) {
          updateNeeded = true;
        }
      }
    }
    if(!updateNeeded) {
      if(this.state.notationArrBlack.length === resBlack.length) {
        for(var i = 0;!updateNeeded && i < resBlack.length;i++) { // eslint-disable-line no-redeclare
          if(resBlack[i] !== this.state.notationArrBlack[i]) {
            updateNeeded = true;
          }
        }
      }
      else {
        updateNeeded = true;
      }
    }

    //Update state if needed
    if(updateNeeded) {
      this.setState({ notationArrWhite: resWhite, notationArrBlack: resBlack });
    }
  }
  componentDidMount() {
    this.extractNotationArr();
  }
  componentDidUpdate(prevProps) {
    if(this.props.notationLine !== prevProps.notationLine) {
      this.extractNotationArr();
    }
  }
  render() {
    return (
      <Box display='flex' flexWrap='wrap' m={0.5}>
        {this.state.notationArrWhite.map((e, i) => {
          return (
            <Box m={0.25} key={i}>
              <NotationSegment
                notationSegment={e}
                fontFamily={this.props.fontFamily}
                fontSize={this.props.fontSize}
                isWhite
                newPresentToken={this.props.newPresentToken}
                newPresentTokenBackgroundColor={this.props.newPresentTokenBackgroundColor}
                newPresentTokenColor={this.props.newPresentTokenColor}
                newTimelineToken={this.props.newTimelineToken}
                newTimelineTokenBackgroundColor={this.props.newTimelineTokenBackgroundColor}
                newTimelineTokenColor={this.props.newTimelineTokenColor}
                highlight={this.props.highlightNotationSegment === e}
                highlightSize={this.props.highlightSize}
                highlightColor={this.props.highlightColor}
                onClick={(str) => {
                  var res = '';
                  for(var j = 0;j <= i && j < this.state.notationArrWhite.length;j++) {
                    res += this.state.notationArrWhite[j] + ' ';
                  }
                  if(typeof this.props.onClick === 'function') {
                    this.props.onClick(res.trim());
                  }
                }}
              />
            </Box>
          );
        })}
        {this.state.notationArrBlack.map((e, i) => {
          return (
            <Box m={0.25} key={i}>
              <NotationSegment
                notationSegment={e}
                fontFamily={this.props.fontFamily}
                fontSize={this.props.fontSize}
                newPresentToken={this.props.newPresentToken}
                newPresentTokenBackgroundColor={this.props.newPresentTokenBackgroundColor}
                newPresentTokenColor={this.props.newPresentTokenColor}
                newTimelineToken={this.props.newTimelineToken}
                newTimelineTokenBackgroundColor={this.props.newTimelineTokenBackgroundColor}
                newTimelineTokenColor={this.props.newTimelineTokenColor}
                highlight={this.props.highlightNotationSegment === e}
                highlightSize={this.props.highlightSize}
                highlightColor={this.props.highlightColor}
                onClick={(str) => {
                  var res = '';
                  for(var j = 0;j < this.state.notationArrWhite.length;j++) {
                    res += this.state.notationArrWhite[j] + ' ';
                  }
                  for(var j = 0;j <= i && j < this.state.notationArrBlack.length;j++) { // eslint-disable-line no-redeclare
                    res += this.state.notationArrBlack[j] + ' ';
                  }
                  if(typeof this.props.onClick === 'function') {
                    this.props.onClick(res.trim());
                  }
                }}
              />
            </Box>
          );
        })}
      </Box>
    );
  }
}
