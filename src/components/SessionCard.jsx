import React from 'react';

import { Trans } from '@lingui/macro';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LanguageIcon from '@material-ui/icons/Language';
import PersonIcon from '@material-ui/icons/Person';

import moment from 'moment';

/*
Props:
 - whitePlayerName
 - whitePlayerType ('human' or 'bot')
 - whiteAvatar - Image src (url or data url) for white player
 - blackPlayerName
 - blackPlayerType ('human' or 'bot')
 - blackAvatar - Image src (url or data url) for black player
 - isServer - Indicate if game is from the 5d-chess-server
 - canPlay
 - started - Indicate if game is started
 - startDate - UNIX timestamp (in milliseconds) of when the game was started
 - ended - Indicate if game is done
 - endDate - UNIX timestamp (in milliseconds) of when the game was ended
 - variant - String of variant used
 - format - String of timing format used
 - winString - String of winner + win cause
 - sessionObject - Associated session object (in the format described by SessionFormat.md)
*/
export default class SessionCard extends React.Component {
  state = {
    previewOpen: false
  };
  render() {
    let whiteIcon = null;
    let blackIcon = null;
    if(this.props.whitePlayerType !== this.props.blackPlayerType) {
      if(this.props.whitePlayerType === 'bot') {
        whiteIcon = <Box mr={1}><DesktopWindowsIcon /></Box>;
      }
      else {
        whiteIcon = <Box mr={1}><PersonIcon /></Box>;
      }
      if(this.props.blackPlayerType === 'bot') {
        blackIcon = <Box mr={1}><DesktopWindowsIcon /></Box>;
      }
      else {
        blackIcon = <Box mr={1}><PersonIcon /></Box>;
      }
    }
    if(typeof this.props.whiteAvatar === 'string') {
      whiteIcon = <Box mr={1}><Avatar src={this.props.whiteAvatar} style={{ backgroundColor: 'white' }} /></Box>;
    }
    if(typeof this.props.blackAvatar === 'string') {
      blackIcon = <Box mr={1}><Avatar src={this.props.blackAvatar} style={{ backgroundColor: 'white' }} /></Box>;
    }
    return (
      <Card>
        <CardHeader
          style={{ paddingBottom: 0 }}
          title={
            <Box display='flex'>
              <Box
                px={1.5}
                py={0.75}
                textAlign='center'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000000',
                  backgroundColor: '#ffffff',
                  margin: 0
                }}
                borderRadius={5}
              >
                {whiteIcon}
                <Typography>{this.props.whitePlayerName}</Typography>
              </Box>
              <Box
                px={1}
                py={0.75}
                textAlign='center'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 0
                }}
                borderRadius={5}
              >
                <Typography><Trans>vs</Trans></Typography>
              </Box>
              <Box
                px={1.5}
                py={0.75}
                textAlign='center'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  backgroundColor: '#000000',
                  margin: 0
                }}
                borderRadius={5}
              >
                {blackIcon}
                <Typography>{this.props.blackPlayerName}</Typography>
              </Box>
              {this.props.isServer ?
                <Box
                  px={1}
                  py={0.75}
                  textAlign='center'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 0
                  }}
                  borderRadius={5}
                >
                  <LanguageIcon color='disabled' />
                </Box>
              :
                null
              }
            </Box>
          }
          action={
            typeof this.props.sessionObject === 'object' ?
              <IconButton
                style={{
                  transitionProperty: 'transform',
                  transform: this.state.previewOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
                onClick={() => {
                  this.setState({ previewOpen: !this.state.previewOpen });
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            :
              null
          }
          subheader={
            this.props.ended ?
              <Box mt={1.5}>
                <Typography variant='subtitle1'>
                  <Trans>Game ended {moment(this.props.endDate).fromNow()}</Trans>
                  <br />
                  {this.props.winString}
                </Typography>
              </Box>
            : this.props.started ?
              <Box mt={1.5}>
                <Typography variant='subtitle1'>
                  <Trans>Game started {moment(this.props.startDate).fromNow()}</Trans>
                </Typography>
              </Box>
            :
              null
          }
        />
        {typeof this.props.variant === 'string' && typeof this.props.format === 'string' ?
          <CardActions>
            <Box p={1}>
              <Typography variant='body2'>
                <Trans>Variant: {this.props.variant}</Trans>
                <br />
                <Trans>Format: {this.props.format}</Trans>
              </Typography>
            </Box>
            <Button color='primary'>
              {this.props.ended ?
                <Trans>Analyze</Trans>
              : this.props.canPlay ?
                <Trans>Play</Trans>
              :
                <Trans>Observe</Trans>
              }
            </Button>
          </CardActions>
        :
          null
        }
      </Card>
    );
  }
}