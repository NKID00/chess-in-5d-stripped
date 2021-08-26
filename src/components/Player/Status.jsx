import React from 'react';

import { Trans } from '@lingui/macro';
import { withStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import PersonIcon from '@material-ui/icons/Person';

import EmitterContext from 'utils/EmitterContext';

import 'components/Player/Blink.css';

/*
Props:
 - whitePlayerName
 - whitePlayerType ('human' or 'bot')
 - blackPlayerName
 - blackPlayerType ('human' or 'bot')
 - whiteActive
 - isLoading
 - isLoadingPlayer
 - isCheckmate
 - isStalemate
 - isCheck
*/
const CustomCheckBadge = withStyles(() => ({
  badge: {
    right: 7,
    top: 7,
    backgroundColor: 'red'
  }
}))(Badge);
const widthThreshold = 300;
const heightThreshold = 50;
export default class Status extends React.Component {
  static contextType = EmitterContext;
  rootRef = React.createRef();
  state = {
    wideMode: true
  };
  resize() {
    if(this.rootRef.current) {
      var width = this.rootRef.current.getBoundingClientRect().width;
      var height = this.rootRef.current.getBoundingClientRect().height;
      this.setState({
        wideMode: width > widthThreshold && height > heightThreshold
      });
    }
  }
  componentDidMount() {
    this.resize();
    this.resizeListener = this.resize.bind(this);
    window.addEventListener('resize', this.resizeListener);
    //Listen to layout resize updates
    this.layoutListener = this.context.on('layoutResizeUpdate', this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
    //Stop listening to layout resize updates
    if(typeof this.layoutListener === 'function') { this.layoutListener(); }
  }
  render() {
    var whiteIcon = null;
    var blackIcon = null;
    if(this.props.whitePlayerType !== this.props.blackPlayerType) {
      if(this.props.whitePlayerType === 'bot') {
        whiteIcon = <Box mx={1}><DesktopWindowsIcon /></Box>;
      }
      else {
        whiteIcon = <Box mx={1}><PersonIcon /></Box>;
      }
      if(this.props.blackPlayerType === 'bot') {
        blackIcon = <Box mx={1}><DesktopWindowsIcon /></Box>;
      }
      else {
        blackIcon = <Box mx={1}><PersonIcon /></Box>;
      }
    }
    if(this.props.isLoadingPlayer) {
      if(this.props.whiteActive) {
        whiteIcon = <Box mx={1}><CircularProgress size={25} thickness={4} /></Box>;
      }
      else {
        blackIcon = <Box mx={1}><CircularProgress size={25} thickness={4} /></Box>;
      }
    }
    if(this.props.isCheckmate || this.props.isFlagged) {
      return (
        <Box p={1} py={1.25} ref={this.rootRef} style={{ height: '100%' }}>
          <Tooltip
            arrow
            title={this.props.isCheckmate ?
              <Trans>By Checkmate</Trans>
            : this.props.isFlagged ?
              <Trans>By Time</Trans>
            :
              <Trans>By Forfeit</Trans>
            }
            placement='top'
          >
            <CustomCheckBadge
              badgeContent='!'
              style={{ height: '100%', width: '100%' }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box
                className='borderBlink'
                animate={1}
                py={0.75}
                textAlign='center'
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: !this.props.whiteActive ? '#000000' : '#ffffff',
                  backgroundColor: !this.props.whiteActive ? '#ffffff' : '#000000',
                  margin: 0
                }}
                border={5}
                borderRadius={5}
                borderColor={!this.props.whiteActive ? '#ffffff' : '#000000'}
              >
                {!this.props.whiteActive ? whiteIcon : blackIcon}
                <Typography>{!this.props.whiteActive ? this.props.whitePlayerName : this.props.blackPlayerName} Wins!</Typography>
              </Box>
            </CustomCheckBadge>
          </Tooltip>
        </Box>
      );
    }
    if(this.props.isStalemate || this.props.isDraw) {
      return (
        <Box p={1} ref={this.rootRef} style={{ height: '100%' }}>
          <Tooltip
            arrow
            title={this.props.isStalemate ?
              <Trans>By Stalemate</Trans>
            :
              <Trans>By Agreement</Trans>
            }
            placement='top'
          >
            <Box
              py={0.75}
              textAlign='center'
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                backgroundColor: '#777777',
                margin: 0
              }}
              border={5}
              borderRadius={5}
              borderColor='#777777'
            >
              <Typography><Trans>Draw</Trans></Typography>
            </Box>
          </Tooltip>
        </Box>
      );
    }
    return (
      <Box p={1} pt={0} pb={this.state.wideMode ? 1 : 2} ref={this.rootRef} style={{ height: '100%' }}>
        <Box width={1} mx={-1} mb={this.props.isLoading ? 0.5 : 1}>
          {this.props.isLoading ?
            <LinearProgress />
          :
            null
          }
        </Box>
        {this.state.wideMode ?
          <Grid container spacing={1} style={{ height: '100%' }}>
            <Grid item xs style={{ height: '100%' }}>
              <Tooltip
                arrow
                title={this.props.isCheck && this.props.whiteActive ?
                  <Trans>In Check</Trans>
                :
                  ''
                }
                placement='top'
              >
                <CustomCheckBadge
                  badgeContent='!'
                  style={{ height: '100%', width: '100%' }}
                  invisible={!this.props.isCheck || !this.props.whiteActive}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box
                    className='borderBlink'
                    animate={1}
                    py={0.75}
                    textAlign='center'
                    style={{
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000000',
                      backgroundColor: '#ffffff',
                      margin: 0
                    }}
                    border={5}
                    borderRadius={5}
                    borderColor={this.props.whiteActive === false ? '#ffffff' : '#000000'}
                  >
                    {whiteIcon}
                    <Typography>{this.props.whitePlayerName}</Typography>
                  </Box>
                </CustomCheckBadge>
              </Tooltip>
            </Grid>
            <Grid item xs={1} style={{ height: '100%' }}>
              <Box
                py={0.75}
                textAlign='center'
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 0
                }}
                border={5}
                borderRadius={5}
                borderColor='rgba(0,0,0,0)'
              >
                <Typography><Trans>vs</Trans></Typography>
              </Box>
            </Grid>
            <Grid item xs style={{ height: '100%' }}>
              <Tooltip
                arrow
                title={this.props.isCheck && !this.props.whiteActive ?
                  <Trans>In Check</Trans>
                :
                  ''
                }
                placement='top'
              >
                <CustomCheckBadge
                  badgeContent='!'
                  style={{ height: '100%', width: '100%' }}
                  invisible={!this.props.isCheck || this.props.whiteActive}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box
                    className='borderBlink'
                    animate={1}
                    py={0.75}
                    textAlign='center'
                    style={{
                      height: '100%',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      backgroundColor: '#000000',
                      margin: 0
                    }}
                    border={5}
                    borderRadius={5}
                    borderColor={this.props.whiteActive === false ? '#ffffff' : '#000000'}
                  >
                    {blackIcon}
                    <Typography>{this.props.blackPlayerName}</Typography>
                  </Box>
                </CustomCheckBadge>
              </Tooltip>
            </Grid>
          </Grid>
        :
          <Tooltip
            arrow
            title={this.props.isCheck ?
              <Trans>In Check</Trans>
            :
              ''
            }
            placement='top'
          >
            <CustomCheckBadge
              badgeContent='!'
              style={{ height: '100%', width: '100%' }}
              invisible={!this.props.isCheck}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box
                className='borderBlink'
                animate={1}
                py={0.75}
                textAlign='center'
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: this.props.whiteActive ? '#000000' : '#ffffff',
                  backgroundColor: this.props.whiteActive ? '#ffffff' : '#000000',
                  margin: 0
                }}
                border={5}
                borderRadius={5}
                borderColor={this.props.whiteActive ? '#ffffff' : '#000000'}
              >
                {this.props.whiteActive ? whiteIcon : blackIcon}
                <Typography>{this.props.whiteActive ? this.props.whitePlayerName : this.props.blackPlayerName}</Typography>
              </Box>
            </CustomCheckBadge>
          </Tooltip>
        }
      </Box>
    );
  }
}
