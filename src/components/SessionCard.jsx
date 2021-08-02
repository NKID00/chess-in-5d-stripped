import React from 'react';

import { Trans } from '@lingui/macro';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import PersonIcon from '@material-ui/icons/Person';

import 'components/Player/Blink.css';

/*
Props:
 - whitePlayerName
 - whitePlayerType ('avatar', 'human', or 'bot')
 - whtieAvatar - Image src (url or data url) for white player
 - blackPlayerName
 - blackPlayerType ('avatar', 'human' or 'bot')
 - blackAvatar - Image src (url or data url) for black player
 - whiteActive - Indicate if it's white time to play (valid only if isActive is true)
 - isServer - Indicate if game is from the 5d-chess-server
 - started - Indicate if game is started
 - startDate - UNIX timestamp (in milliseconds) of when the game was started
 - ended - Indicate if game is done
 - endDate - UNIX timestamp (in milliseconds) of when the game was ended
*/
export default class SessionCard extends React.Component {
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
    return (
      <Card>
        <Grid container spacing={1}>
          <Grid item xs>
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
          </Grid>
        </Grid>
      </Card>
    );
  }
}