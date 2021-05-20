import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Layout from 'components/Player/Layout';
import Renderer from 'components/Player/Renderer';

/*
Props:
 - board
 - actionHistory
 - moveBuffer
 - checks
 - availableMoves
 - pastAvailableMoves
*/

export default class Player extends React.Component {
  rootRef = React.createRef();
  chessRendererRef = React.createRef();
  state = {
    rowOffset: 0
  };
  resize() {
    this.chessRendererRef.current.refreshAttach();
    if(this.rootRef.current) {
      var top = this.rootRef.current.getBoundingClientRect().top;
      if(top !== this.state.rowOffset) {
        this.setState({
          rowOffset: top
        })
      }
    }
  }
  componentDidMount() {
    this.resize();
    this.resizeListener = this.resize.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }
  render() {
    return (
      <div
        ref={this.rootRef}
        style={{
          overflow: 'hidden',
          margin: 0,
          padding: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <Renderer
            ref={this.chessRendererRef}
            height={1}
            width={1}
            board={this.props.board}
            actionHistory={this.props.actionHistory}
            moveBuffer={this.props.moveBuffer}
            checks={this.props.checks}
            availableMoves={this.props.availableMoves}
            pastAvailableMoves={this.props.pastAvailableMoves}
          />
        </div>
        <Layout rowOffset={this.state.rowOffset}>
          <Card key='menu'>
            <CardContent>Menu</CardContent>
          </Card>
          <Card key='clock'>
            <CardContent>Clock</CardContent>
          </Card>
          <Card key='analyze'>
            <CardContent>Analyze</CardContent>
          </Card>
          <Card key='tutorial'>
            <CardContent>Tutorial</CardContent>
          </Card>
          <Card key='settings'>
            <CardContent>Settings</CardContent>
          </Card>
          <Card key='notation'>
            <CardContent>Notation</CardContent>
          </Card>
          <Card key='view'>
            <CardContent>View</CardContent>
          </Card>
          <Card key='submit'>
            <CardContent>Submit</CardContent>
          </Card>
        </Layout>
      </div>
    );
  }
}