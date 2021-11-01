import React from 'react';
import { withRouter } from 'react-router';

import { Trans } from '@lingui/macro';

import AvatarGroup from '@material-ui/lab/AvatarGroup';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LanguageIcon from '@material-ui/icons/Language';
import PersonIcon from '@material-ui/icons/Person';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import UserAvatar from 'components/UserAvatar';
import Renderer from 'components/Player/Renderer';

import moment from 'moment';
import Chess from '5d-chess-js';
import ChessClock from '5d-chess-clock';

import EmitterContext from 'utils/EmitterContext';
import * as SessionInfo from 'utils/SessionInfo';

const deepequal = require('fast-deep-equal');

/*
Props:
 - session - Associated session object (in the format described by SessionFormat.md)
*/
class SessionCard extends React.Component {
  static contextType = EmitterContext;
  chess = new Chess();
  chessClock = new ChessClock();
  state = {
    previewOpen: false,
    whitePlayerName: '',
    whitePlayerType: '',
    whiteUsername: '',
    blackPlayerName: '',
    blackPlayerType: '',
    blackUsername: '',
    isServer: false,
    canPlay: false,
    started: false,
    startDate: 0,
    ended: false,
    endDate: 0,
    variant: '',
    format: '',
    winString: null,
  };
  async refresh() {
    if(typeof this.props.session === 'object' && this.props.session !== null) {
      let isServer = typeof this.props.session.host !== 'undefined';
      let canPlay = false;
      let whitePlayerName = '';
      let whitePlayerType = 'blank'; //'human', 'bot', or 'blank'
      let whiteUsername = '';
      let blackPlayerName = '';
      let blackPlayerType = 'blank'; //'human', 'bot', or 'blank'
      let blackUsername = '';
      //Get session info
      let sessionInfo = await SessionInfo.getInfo(this.props.session);
      isServer = sessionInfo.isServer;
      whitePlayerName = sessionInfo.whitePlayerName;
      whitePlayerType = sessionInfo.whitePlayerType;
      whiteUsername = sessionInfo.whiteUsername;
      blackPlayerName = sessionInfo.blackPlayerName;
      blackPlayerType = sessionInfo.blackPlayerType;
      blackUsername = sessionInfo.blackUsername;
      canPlay = sessionInfo.canPlay;

      //Extract variant long name
      let variant = this.props.session.variant;
      if(this.props.session.variant.includes('[')) {
        variant = 'Custom';
      }
      for(let v of this.chess.variants) {
        if(v.shortName === this.props.session.variant) {
          variant = v.name;
        }
      }
      //Extract format name
      let format = this.props.session.format;
      if(typeof format !== 'string') {
        format = 'Untimed';
      }
      for(let f of this.chessClock.formats) {
        if(f.shortName === this.props.session.format) {
          format = f.name;
        }
      }
      //Extract win string
      let winString = null;
      if(this.props.session.winner !== null && this.props.session.winCause !== null) {
        if(this.props.session.winner === 'white') {
          if(this.props.session.winCause === 'time') {
            winString = <Trans>{whitePlayerName} won by time!</Trans>;
          }
          if(this.props.session.winCause === 'forfeit') {
            winString = <Trans>{whitePlayerName} won by forfeit!</Trans>;
          }
          if(this.props.session.winCause === 'regular') {
            winString = <Trans>{whitePlayerName} won by checkmate!</Trans>;
          }
        }
        if(this.props.session.winner === 'black') {
          if(this.props.session.winCause === 'time') {
            winString = <Trans>{blackPlayerName} won by time!</Trans>;
          }
          if(this.props.session.winCause === 'forfeit') {
            winString = <Trans>{blackPlayerName} won by forfeit!</Trans>;
          }
          if(this.props.session.winCause === 'regular') {
            winString = <Trans>{blackPlayerName} won by checkmate!</Trans>;
          }
        }
        if(this.props.session.winner === 'draw') {
          if(this.props.session.winCause === 'forfeit') {
            winString = <Trans>Draw!</Trans>;
          }
          if(this.props.session.winCause === 'regular') {
            winString = <Trans>Checkmate!</Trans>;
          }
        }
      }
      this.setState({
        isServer: isServer,
        canPlay: canPlay,
        whitePlayerName: whitePlayerName,
        whitePlayerType: whitePlayerType,
        whiteUsername: whiteUsername,
        blackPlayerName: blackPlayerName,
        blackPlayerType: blackPlayerType,
        blackUsername: blackUsername,
        variant: variant,
        format: format,
        winString: winString,
      });
    }
  }
  componentDidMount() {
    this.refresh();
    //Update state if auth store is changed
    this.authListener = this.context.on('authUpdate', () => {
      this.refresh();
    });
  }
  componentDidUpdate(prevProps) {
    if(!deepequal(prevProps.session, this.props.session)) {
      this.refresh();
    }
  }
  componentWillUnmount() {
    //Stop listening to auth store changes
    if(typeof this.authListener === 'function') { this.authListener(); }
  }
  render() {
    let whiteAvatar = null;
    let blackAvatar = null;
    if(this.state.isServer) {
      if(this.state.whiteUsername) {
        whiteAvatar = <UserAvatar username={this.state.whiteUsername} />;
      }
      else {
        whiteAvatar = <Avatar style={{ color: 'black', backgroundColor: 'white' }}><HelpOutlineIcon /></Avatar>;
      }
      if(this.state.blackUsername) {
        blackAvatar = <UserAvatar username={this.state.blackUsername} />;
      }
      else {
        blackAvatar = <Avatar style={{ color: 'white', backgroundColor: 'black' }}><HelpOutlineIcon /></Avatar>;
      }
    }
    else {
      if(this.state.whitePlayerType === 'bot') {
        whiteAvatar = <Avatar style={{ color: 'black', backgroundColor: 'white' }}><DesktopWindowsIcon /></Avatar>;
      }
      else {
        whiteAvatar = <Avatar style={{ color: 'black', backgroundColor: 'white' }}><PersonIcon /></Avatar>;
      }
      if(this.state.blackPlayerType === 'bot') {
        blackAvatar = <Avatar style={{ color: 'white', backgroundColor: 'black' }}><DesktopWindowsIcon /></Avatar>;
      }
      else {
        blackAvatar = <Avatar style={{ color: 'white', backgroundColor: 'black' }}><PersonIcon /></Avatar>;
      }
    }
    return (
      <Card elevation={this.props.flat ? 0 : 1}>
        <CardHeader
          style={{ paddingBottom: 0 }}
          title={
            <Box display='flex'>
              <Box mr={2}>
                <AvatarGroup>
                  {whiteAvatar}
                  {blackAvatar}
                </AvatarGroup>
              </Box>
              {this.state.isServer ?
                <>
                  <Box mx={2}>
                    {this.state.whitePlayerName.length <= 0 ? 
                      <i>
                        <Trans>[Empty]</Trans>
                      </i>
                    : 
                      this.state.whitePlayerName
                    } vs {this.state.blackPlayerName.length <= 0 ? 
                      <i>
                        <Trans>[Empty]</Trans>
                      </i>
                    : 
                      this.state.blackPlayerName
                    }
                  </Box>
                  <IconButton disabled>
                    <LanguageIcon />
                  </IconButton>
                </>
              :
                <></>
              }
            </Box>
          }
          action={
            <IconButton
              onClick={() => {
                this.setState({ previewOpen: !this.state.previewOpen });
              }}
            >
              {this.state.previewOpen ?
                <VisibilityOffIcon />
              :
                <VisibilityIcon />
              }
            </IconButton>
          }
          subheader={
            this.props.session.ended ?
              <Box mt={1.5}>
                <Typography variant='subtitle1'>
                  <Trans>Game ended {moment(this.props.session.endDate).fromNow()}</Trans>
                  <br />
                  {this.state.winString}
                </Typography>
              </Box>
            : this.props.session.started ?
              <Box mt={1.5}>
                <Typography variant='subtitle1'>
                  <Trans>Game started {moment(this.props.session.startDate).fromNow()}</Trans>
                </Typography>
              </Box>
            :
              null
          }
        />
        <Collapse
          in={this.state.previewOpen}
          mountOnEnter
          unmountOnExit
          enter={false}
        >
          <CardMedia>
            <Renderer
              height={170}
              width={1}
              config={{ app: { interactive: false } }}
              board={this.props.session.board}
              actionHistory={this.props.session.actionHistory}
              moveBuffer={this.props.session.moveBuffer}
            />
          </CardMedia>
        </Collapse>
        <CardActions>
          <Box p={1}>
            <Typography variant='body2'>
              <Trans>Variant: {this.state.variant}</Trans>
              <br />
              <Trans>Format: {this.state.format}</Trans>
            </Typography>
          </Box>
          <Button
            color='primary'
            onClick={() => {
              if(this.props.session.ended) {
                this.props.history.push('/analyze?id=' + this.props.session.id);
              }
              else {
                this.props.history.push('/play?id=' + this.props.session.id);
              }
            }}
          >
            {this.props.session.ended ?
              <Trans>Analyze</Trans>
            : this.state.canPlay ?
              <Trans>Play</Trans>
            :
              <Trans>Observe</Trans>
            }
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(SessionCard);