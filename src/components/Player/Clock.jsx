import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import EmitterContext from 'EmitterContext';
import * as muiTheme from 'state/theme';

export default class Clock extends React.Component {
  static contextType = EmitterContext;
  state = {
    clockFont: muiTheme.get().extra.clock.fontFamily
  };
  whiteClock = React.createRef();
  blackClock = React.createRef();
  internalClock() {
    //Init internal values
    if(typeof this.whiteTimeLeft === 'undefined') {
      this.whiteTimeLeft = 0;
      if(typeof this.props.whiteTimeLeft === 'number') {
        this.whiteTimeLeft = this.props.whiteTimeLeft;
      }
    }
    if(typeof this.whiteDelayLeft === 'undefined') {
      this.whiteDelayLeft = 0;
      if(typeof this.props.whiteDelayLeft === 'number') {
        this.whiteDelayLeft = this.props.whiteDelayLeft;
      }
    }
    if(typeof this.blackTimeLeft === 'undefined') {
      this.blackTimeLeft = 0;
      if(typeof this.props.blackTimeLeft === 'number') {
        this.blackTimeLeft = this.props.blackTimeLeft;
      }
    }
    if(typeof this.blackDelayLeft === 'undefined') {
      this.blackDelayLeft = 0;
      if(typeof this.props.blackDelayLeft === 'number') {
        this.blackDelayLeft = this.props.blackDelayLeft;
      }
    }
    if(typeof this.whiteActive === 'undefined') {
      this.whiteActive = true;
      if(typeof this.props.whiteActive === 'boolean') {
        this.whiteActive = this.props.whiteActive;
      }
    }
    //Calculate time update
    if(typeof this.lastUpdate === 'undefined') {
      this.timeDelta = 0;
      this.lastUpdate = Date.now();
    }
    else {
      this.timeDelta = Date.now() - this.lastUpdate;
      this.lastUpdate = Date.now();
    }
    if(this.whiteActive && (this.whiteTimeLeft > 0 || this.whiteDelayLeft > 0)) {
      this.whiteDelayLeft -= this.timeDelta;
      if(this.whiteDelayLeft < 0) {
        this.whiteTimeLeft += this.whiteDelayLeft;
        this.whiteDelayLeft = 0;
      }
    }
    if(!this.whiteActive && (this.blackTimeLeft > 0 || this.blackDelayLeft > 0)) {
      this.blackDelayLeft -= this.timeDelta;
      if(this.blackDelayLeft < 0) {
        this.blackTimeLeft += this.blackDelayLeft;
        this.blackDelayLeft = 0;
      }
    }
    //Display time
    if(this.whiteClock.current !== null) {
      var whiteElem = this.whiteClock.current;
      var res = '';
      //Showing time left
      //Insert hour if needed
      if(this.whiteTimeLeft >= 60*60*1000) {
        res += Math.floor(this.whiteTimeLeft / (60*60*1000)).toFixed();
      }
      //Show minutes
      if(this.whiteTimeLeft >= 60*1000) {
        if(this.whiteTimeLeft >= 60*60*1000) {
          res += ':';
        }
        if(this.whiteTimeLeft >= 10*60*1000) {
          res += (Math.floor((this.whiteTimeLeft / (60*1000)) % 60)).toFixed().padStart(2, '0');
        }
        else {
          res += (Math.floor((this.whiteTimeLeft / (60*1000)) % 60)).toFixed();
        }
      }
      //Show seconds
      if(this.whiteTimeLeft >= 60*1000) {
        res += ':';
      }
      if(this.whiteTimeLeft >= 10*1000) {
        res += (Math.floor(this.whiteTimeLeft / 1000) % 60 % 60).toFixed().padStart(2, '0');
      }
      else {
        res += (Math.floor(this.whiteTimeLeft / 1000) % 60 % 60).toFixed();
      }
      //Show milliseconds if less than 1 minute
      if(this.whiteTimeLeft < 60*1000) {
        res += '.';
        res += (Math.floor(this.whiteTimeLeft / 100) % 10 % 60 % 60).toFixed();
      }
      //Show 0:00 if no time left
      if(this.whiteTimeLeft <= 0) {
        res = '0:00';
      }

      //Show delay left if needed
      if(this.whiteDelayLeft > 0) {
        res += '+';
        //Insert hour if needed
        if(this.whiteDelayLeft >= 60*60*1000) {
          res += Math.floor(this.whiteDelayLeft / (60*60*1000)).toFixed();
        }
        //Show minutes
        if(this.whiteDelayLeft >= 60*1000) {
          if(this.whiteDelayLeft >= 60*60*1000) {
            res += ':';
          }
          if(this.whiteDelayLeft >= 10*60*1000) {
            res += (Math.floor((this.whiteDelayLeft / (60*1000)) % 60)).toFixed().padStart(2, '0');
          }
          else {
            res += (Math.floor((this.whiteDelayLeft / (60*1000)) % 60)).toFixed();
          }
        }
        //Show seconds
        if(this.whiteDelayLeft > 60*1000) {
          res += ':';
        }
        if(this.whiteDelayLeft >= 10*1000) {
          res += (Math.floor(this.whiteDelayLeft / 1000 % 60 % 60)).toFixed().padStart(2, '0');
        }
        else {
          res += (Math.floor(this.whiteDelayLeft / 1000 % 60 % 60)).toFixed();
        }
      }
      whiteElem.innerText = res;
    }
    if(this.blackClock.current !== null) {
      var blackElem = this.blackClock.current;
      var res = ''; // eslint-disable-line no-redeclare
      //Showing time left
      //Insert hour if needed
      if(this.blackTimeLeft >= 60*60*1000) {
        res += Math.floor(this.blackTimeLeft / (60*60*1000)).toFixed();
      }
      //Show minutes
      if(this.blackTimeLeft >= 60*1000) {
        if(this.blackTimeLeft >= 60*60*1000) {
          res += ':';
        }
        if(this.blackTimeLeft >= 10*60*1000) {
          res += (Math.floor((this.blackTimeLeft / (60*1000)) % 60)).toFixed().padStart(2, '0');
        }
        else {
          res += (Math.floor((this.blackTimeLeft / (60*1000)) % 60)).toFixed();
        }
      }
      //Show seconds
      if(this.blackTimeLeft >= 60*1000) {
        res += ':';
      }
      if(this.blackTimeLeft >= 10*1000) {
        res += (Math.floor(this.blackTimeLeft / 1000) % 60 % 60).toFixed().padStart(2, '0');
      }
      else {
        res += (Math.floor(this.blackTimeLeft / 1000) % 60 % 60).toFixed();
      }
      //Show milliseconds if less than 1 minute
      if(this.blackTimeLeft < 60*1000) {
        res += '.';
        res += (Math.floor(this.blackTimeLeft / 100) % 10 % 60 % 60).toFixed();
      }
      //Show 0:00 if no time left
      if(this.blackTimeLeft <= 0) {
        res = '0:00';
      }

      //Show delay left if needed
      if(this.blackDelayLeft > 0) {
        res += '+';
        //Insert hour if needed
        if(this.blackDelayLeft >= 60*60*1000) {
          res += Math.floor(this.blackDelayLeft / (60*60*1000)).toFixed();
        }
        //Show minutes
        if(this.blackDelayLeft >= 60*1000) {
          if(this.blackDelayLeft >= 60*60*1000) {
            res += ':';
          }
          if(this.blackDelayLeft >= 10*60*1000) {
            res += (Math.floor((this.blackDelayLeft / (60*1000)) % 60)).toFixed().padStart(2, '0');
          }
          else {
            res += (Math.floor((this.blackDelayLeft / (60*1000)) % 60)).toFixed();
          }
        }
        //Show seconds
        if(this.blackDelayLeft > 60*1000) {
          res += ':';
        }
        if(this.blackDelayLeft >= 10*1000) {
          res += (Math.floor(this.blackDelayLeft / 1000 % 60 % 60)).toFixed().padStart(2, '0');
        }
        else {
          res += (Math.floor(this.blackDelayLeft / 1000 % 60 % 60)).toFixed();
        }
      }
      blackElem.innerText = res;
    }
  }
  componentDidMount() {
    //Update state if theme settings are changed
    this.themeListener = this.context.on('themeUpdate', () => {
      this.setState({
        clockFont: muiTheme.get().extra.clock.fontFamily
      });
    });
    this.internalClockListener = window.setInterval(this.internalClock.bind(this), 100);
  }
  componentDidUpdate(prevProps) {
    //Init internal values
    if(this.props.whiteTimeLeft !== prevProps.whiteTimeLeft) {
      if(typeof this.props.whiteTimeLeft === 'number') {
        this.whiteTimeLeft = this.props.whiteTimeLeft;
      }
    }
    if(this.props.whiteDelayLeft !== prevProps.whiteDelayLeft) {
      if(typeof this.props.whiteDelayLeft === 'number') {
        this.whiteDelayLeft = this.props.whiteDelayLeft;
      }
    }
    if(this.props.blackTimeLeft !== prevProps.blackTimeLeft) {
      if(typeof this.props.blackTimeLeft === 'number') {
        this.blackTimeLeft = this.props.blackTimeLeft;
      }
    }
    if(this.props.blackDelayLeft !== prevProps.blackDelayLeft) {
      if(typeof this.props.blackDelayLeft === 'number') {
        this.blackDelayLeft = this.props.blackDelayLeft;
      }
    }
    if(this.props.whiteActive !== prevProps.whiteActive) {
      if(typeof this.props.whiteActive === 'boolean') {
        this.whiteActive = this.props.whiteActive;
      }
    }
  }
  componentWillUnmount() {
    //Stop listening to theme setting changes
    if(typeof this.themeListener === 'function') { this.themeListener(); }
    window.clearInterval(this.internalClockListener);
  }
  render() {
    return (
      <Card>
        <Box m={1}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                fullWidth
                style={{
                  fontFamily: this.state.clockFont,
                  color: '#ffffff',
                  backgroundColor: '#000000',
                }}
                disableElevation
              >
                <div ref={this.blackClock}>
                  0:00
                </div>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                style={{
                  fontFamily: this.state.clockFont,
                  color: '#000000',
                  backgroundColor: '#ffffff',
                }}
                disableElevation
              >
                <div ref={this.whiteClock}>
                  0:00
                </div>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    );
  }
}
