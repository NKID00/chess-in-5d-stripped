import React from 'react';

import { Trans } from '@lingui/macro';
import { withStyles } from '@material-ui/core/styles';

import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';

import CommentIcon from '@material-ui/icons/Comment';
import { FaChessPawn, FaChessKnight, FaChessBishop, FaChessRook, FaChessQueen, FaChessKing } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { BsArrowLeftRight } from 'react-icons/bs'

import 'components/Player/Blink.css';

export default class NotationSegment extends React.Component {
  state = {
    openComment: false,
    comment: '',
    commentAnchor: null
  }
  clickHandler() {
    if(typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  }
  render() {
    //Check if segement is comment
    //Return comment displaying icon if it is
    if(this.props.notationSegment.includes('{')) {
      var comment = this.props.notationSegment.replace(/\{/g,'').replace(/\}/g,'');
      var truncComment = comment;
      if(truncComment.length > 30) {
        if(truncComment[29] === '.') {
          truncComment = `${comment.substr(0, 30)}..`;
        }
        else {
          truncComment = `${comment.substr(0, 30)}...`;
        }
      }
      return (
        <Box height={1}>
          <Tooltip
            arrow
            title={
              <Box
                style={{
                  fontFamily: this.props.fontFamily
                }}
              >
                {comment.length > 30 ? `${comment.substr(0, 30)}...` : comment}
              </Box>
            }
            placement='top'
          >
            <IconButton
              size='small'
              onClick={(e) => {
                this.setState({
                  openComment: !this.state.openComment,
                  comment: comment,
                  commentAnchor: e.currentTarget
                });
              }}
            >
              <CommentIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Popover
            open={this.state.openComment}
            anchorEl={this.state.commentAnchor}
            style={{
              fontFamily: this.props.fontFamily,
              fontSize: this.props.fontSize,
            }}
            onClose={(e) => {
              this.setState({
                openComment: false
              });
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={1}>
              {this.state.comment}
            </Box>
          </Popover>
        </Box>
      );
    }
    //Check if segement is action indicator or separator
    //Return generic chip if it is
    if(this.props.notationSegment.match(/^\d+\./) !== null || this.props.notationSegment === '/') {
      return (
        <Chip
          label={this.props.notationSegment}
          size='small'
          style={{
            fontFamily: this.props.fontFamily,
            fontSize: this.props.fontSize,
          }}
        />
      );
    }
    //Check if segement is timeline activation token
    //Return timeline activation indication chip if it is
    if(this.props.notationSegment.match(/^\(~T-?\+?\d+\)/) !== null) {
      if(!this.props.newPresentToken) { return (<></>); }
      var turn = this.props.notationSegment.match(/^\(~T(-?\+?\d+)\)/)[1];
      return (
        <Tooltip
          arrow
          title={
            <Box
              style={{
                fontFamily: this.props.fontFamily,
                fontSize: this.props.fontSize,
              }}
            >
              <Trans>Present Moved To Turn {turn}!</Trans>
            </Box>
          }
          placement='top'
        >
          <Chip
            label={this.props.notationSegment}
            size='small'
            style={{
              backgroundColor: this.props.newPresentTokenBackgroundColor,
              color: this.props.newPresentTokenColor,
              fontFamily: this.props.fontFamily,
              fontSize: this.props.fontSize,
            }}
          />
        </Tooltip>
      );
    }
    //Check if segement is new timeline token
    //Return new timeline indication chip if it is
    if(this.props.notationSegment.match(/^\(>L-?\+?\d+\)/) !== null) {
      if(!this.props.newTimelineToken) { return (<></>); }
      var timeline = this.props.notationSegment.match(/^\(>L(-?\+?\d+)\)/)[1];
      if(!timeline.includes('+') && !timeline.includes('-')) {
        timeline = `+${timeline}`;
      }
      return (
        <Tooltip
          arrow
          title={
            <Box
              style={{
                fontFamily: this.props.fontFamily,
                fontSize: this.props.fontSize,
              }}
            >
              <Trans>{timeline} Timeline Created!</Trans>
            </Box>
          }
          placement='top'
        >
          <Chip
            label={this.props.notationSegment}
            size='small'
            style={{
              backgroundColor: this.props.newTimelineTokenBackgroundColor,
              color: this.props.newTimelineTokenColor,
              fontFamily: this.props.fontFamily,
              fontSize: this.props.fontSize,
            }}
          />
        </Tooltip>
      );
    }
    //Assuming segment is move and returning styled move chip component
    var icon = <FaChessPawn color={this.props.isWhite ? '#000000' : '#ffffff'} />;
    //Looking for piece (non-promotion) and selecting appropriate chess icon
    if(
      this.props.notationSegment.match(/[^=][KCQYSNRBUD]+/) !== null ||
      this.props.notationSegment.match(/^[KCQYSNRBUD]+/) !== null
    ) {
      var piece = this.props.notationSegment.match(/[^=]([KCQYSNRBUD]+)/);
      if(piece === null) {
        piece = this.props.notationSegment.match(/^([KCQYSNRBUD]+)/)[1];
      }
      else {
        piece = piece[1];
      }
      if(
        piece === 'K' ||
        piece === 'C'
      ) {
        icon = <FaChessKing color={this.props.isWhite ? '#000000' : '#ffffff'} />;
      }
      if(
        piece === 'Q' ||
        piece === 'Y' ||
        piece === 'RQ' ||
        piece === 'S' ||
        piece === 'PR'
      ) {
        icon = <FaChessQueen color={this.props.isWhite ? '#000000' : '#ffffff'} />;
      }
      if(
        piece === 'R'
      ) {
        icon = <FaChessRook color={this.props.isWhite ? '#000000' : '#ffffff'} />;
      }
      if(
        piece === 'B'
      ) {
        icon = <FaChessBishop color={this.props.isWhite ? '#000000' : '#ffffff'} />;
      }
      if(
        piece === 'N' ||
        piece === 'U' ||
        piece === 'D'
      ) {
        icon = <FaChessKnight color={this.props.isWhite ? '#000000' : '#ffffff'} />;
      }
    }
    //Looking for piece (promotion) and selecting appropriate chess icons
    if(this.props.notationSegment.match(/=[KCQYSNRBUD]+/) !== null) {
      var piece = this.props.notationSegment.match(/=([KCQYSNRBUD]+)/)[1]; // eslint-disable-line no-redeclare
      if(
        piece === 'K' ||
        piece === 'C'
      ) {
        icon = (
          <Box display='flex' style={{width: this.props.fontSize * 4, marginRight: 0}}>
            <FaChessPawn size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
            <FiArrowRight size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
            <FaChessKing size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
          </Box>
        );
      }
      if(
        piece === 'Q' ||
        piece === 'Y' ||
        piece === 'RQ' ||
        piece === 'S' ||
        piece === 'PR'
      ) {
        icon = (
          <Box display='flex' style={{width: this.props.fontSize * 4, marginRight: 0}}>
            <FaChessPawn size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
            <FiArrowRight size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
            <FaChessQueen size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
          </Box>
        );
      }
      if(
        piece === 'R'
      ) {
        icon = (
          <Box display='flex' style={{width: this.props.fontSize * 4, marginRight: 0}}>
            <FaChessPawn size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
            <FiArrowRight size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
            <FaChessRook size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
          </Box>
        );
      }
      if(
        piece === 'B'
      ) {
        icon = (
          <Box display='flex' style={{width: this.props.fontSize * 4, marginRight: 0}}>
            <FaChessPawn size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
            <FiArrowRight size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
            <FaChessBishop size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
          </Box>
        );
      }
      if(
        piece === 'N' ||
        piece === 'U' ||
        piece === 'D'
      ) {
        icon = (
          <Box display='flex' style={{width: this.props.fontSize * 4, marginRight: 0}}>
            <FaChessPawn size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
            <FiArrowRight size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
            <FaChessKnight size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
          </Box>
        );
      }
    }
    //Looking for castling and selecting appropriate chess icons
    if(this.props.notationSegment.includes('O-O-O')) {
      icon = (
        <Box display='flex' style={{width: this.props.fontSize * 4, marginRight: 0}}>
          <FaChessRook size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
          <BsArrowLeftRight size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
          <FaChessKing size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
        </Box>
      );
    }
    else if(this.props.notationSegment.includes('O-O')) {
      icon = (
        <Box display='flex' style={{width: this.props.fontSize * 4, marginRight: 0}}>
          <FaChessKing size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
          <BsArrowLeftRight size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
          <FaChessRook size='small' color={this.props.isWhite ? '#000000' : '#ffffff'} />
        </Box>
      );
    }
    //Check if move activates new timeline and show tooltip + badge if the case
    var newPresentTimeline = this.props.notationSegment.includes('~') && this.props.newPresentToken;
    var CustomNewActiveTimelineBadge = withStyles(() => ({
      badge: {
        right: 2,
        top: 2,
        backgroundColor: this.props.newPresentTokenBackgroundColor
      }
    }))(Badge);
    return (
      <Tooltip
        arrow
        title={newPresentTimeline ?
          <Box
            style={{
              fontFamily: this.props.fontFamily,
              fontSize: this.props.fontSize,
            }}
          >
            <Trans>New Timeline Activating!</Trans>
          </Box>
        :
          ''
        }
        placement='top'
      >
        <CustomNewActiveTimelineBadge
          variant='dot'
          invisible={!newPresentTimeline}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Chip
            className='borderBlink'
            animate={this.props.highlight ? 1 : 0}
            label={this.props.notationSegment}
            size='small'
            icon={icon}
            style={{
              backgroundColor: (this.props.isWhite ? '#ffffff' : '#000000'),
              color: (this.props.isWhite ? '#000000' : '#ffffff'),
              borderWidth: (this.props.highlight ? this.props.highlightSize : 0),
              borderColor: this.props.highlightColor,
              borderStyle: 'solid',
              fontFamily: this.props.fontFamily,
              fontSize: this.props.fontSize,
            }}
            onClick={this.clickHandler.bind(this)}
          />
        </CustomNewActiveTimelineBadge>
      </Tooltip>
    );
  }
}
