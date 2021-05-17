import React from 'react';

import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Renderer from 'components/Player/Renderer';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const deepcopy = require('deepcopy');
const store = require('store');

/*
Props:
 - board
 - actionHistory
 - moveBuffer
 - checks
 - availableMoves
 - pastAvailableMoves
*/
const rowHeight = 30;
const rowMargin = 11;

//TODO: Rework layout system to fit vertically
export default class Player extends React.Component {
  chessRenderer = React.createRef();
  state = {
    layouts: this.layouts(),
    width: 1280
  };
  defaultLayout() {
    return {
      lg: [
        {i: 'menu', x: 0, y: 2, w: 4, h: 2},
        {i: 'clock', x: 4, y: 2, w: 4, h: 2},
        {i: 'analyze', x: 4, y: 4, w: 4, h: 2},
        {i: 'tutorial', x: 8, y: 2, w: 4, h: 9},
        {i: 'settings', x: 0, y: 4, w: 4, h: 7},
        {i: 'notation', x: 0, y: -9, w: 4, h: 9},
        {i: 'view', x: 6, y: -2, w: 3, h: 2},
        {i: 'submit', x: 9, y: -2, w: 3, h: 2},
      ],
      md: [
        {i: 'menu', x: 0, y: 2, w: 4, h: 2},
        {i: 'clock', x: 4, y: 2, w: 4, h: 2},
        {i: 'analyze', x: 4, y: 4, w: 4, h: 2},
        {i: 'tutorial', x: 8, y: 2, w: 4, h: 9},
        {i: 'settings', x: 0, y: 4, w: 4, h: 7},
        {i: 'notation', x: 0, y: -9, w: 5, h: 9},
        {i: 'view', x: 6, y: -2, w: 3, h: 2},
        {i: 'submit', x: 9, y: -2, w: 3, h: 2},
      ],
      sm: [
        {i: 'menu', x: 0, y: 2, w: 6, h: 2},
        {i: 'clock', x: 6, y: 2, w: 6, h: 2},
        {i: 'analyze', x: 6, y: 4, w: 6, h: 2},
        {i: 'tutorial', x: 7, y: -9, w: 5, h: 7},
        {i: 'settings', x: 0, y: 4, w: 4, h: 6},
        {i: 'notation', x: 0, y: -7, w: 4, h: 7},
        {i: 'view', x: 4, y: -2, w: 4, h: 2},
        {i: 'submit', x: 8, y: -2, w: 4, h: 2},
      ],
      xs: [
        {i: 'menu', x: 0, y: 2, w: 6, h: 2},
        {i: 'clock', x: 6, y: 2, w: 6, h: 2},
        {i: 'analyze', x: 6, y: 4, w: 6, h: 2},
        {i: 'tutorial', x: 6, y: -9, w: 6, h: 7},
        {i: 'settings', x: 0, y: 4, w: 4, h: 6},
        {i: 'notation', x: 0, y: -9, w: 6, h: 7},
        {i: 'view', x: 2, y: -2, w: 5, h: 2},
        {i: 'submit', x: 7, y: -2, w: 5, h: 2},
      ],
      xxs: [
        {i: 'menu', x: 0, y: 2, w: 6, h: 2},
        {i: 'clock', x: 6, y: 2, w: 6, h: 2},
        {i: 'analyze', x: 0, y: 4, w: 12, h: 2},
        {i: 'tutorial', x: 0, y: -7, w: 12, h: 5},
        {i: 'settings', x: 0, y: 6, w: 5, h: 5},
        {i: 'notation', x: 5, y: 6, w: 7, h: 6},
        {i: 'view', x: 0, y: -2, w: 6, h: 2},
        {i: 'submit', x: 6, y: -2, w: 6, h: 2},
      ],
    };
  }
  layouts() {
    if(typeof store.get('player/layouts') === 'object') {
      return this.transformLayout(store.get('player/layouts'));
    }
    return this.transformLayout(this.defaultLayout());
  }
  resize() {
    this.chessRenderer.current.refreshAttach();
    this.setState({
      width: window.innerWidth,
      layouts: this.layouts()
    });
  }
  transformLayout(layout, importMode = true) {
    var res = deepcopy(layout);
    var defaultLayout = this.defaultLayout();
    var maxHeight = Math.floor(window.innerHeight / (rowHeight + rowMargin));
    var keys = Object.keys(res);
    //Merge from defaultLayout
    for(var j = 0;j < keys.length;j++) {
      for(var k = 0;k < defaultLayout[keys[j]].length;k++) {
        var includesItem = false;
        for(var i = 0;i < res[keys[j]].length;i++) {
          if(res[keys[j]][i].i === defaultLayout[keys[j]][k].i) {
            includesItem = true;
          }
        }
        if(!includesItem) {
          res[keys[j]].push(defaultLayout[keys[j]][k]);
        }
      }
    }
    if(importMode) {
      for(var j = 0;j < keys.length;j++) { // eslint-disable-line no-redeclare
        for(var i = 0;i < res[keys[j]].length;i++) { // eslint-disable-line no-redeclare
          if(res[keys[j]][i].y < 0) {
            res[keys[j]][i].y = maxHeight + res[keys[j]][i].y;
          }
          if(res[keys[j]][i].y < 2 && res[keys[j]][i].y >= 0) {
            res[keys[j]][i].y = 2;
          }
        }
      }
    }
    else {
      for(var j = 0;j < keys.length;j++) { // eslint-disable-line no-redeclare
        for(var i = 0;i < res[keys[j]].length;i++) { // eslint-disable-line no-redeclare
          if(res[keys[j]][i].y > maxHeight / 2) {
            res[keys[j]][i].y = -(maxHeight - res[keys[j]][i].y);
          }
          if(res[keys[j]][i].y < 2 && res[keys[j]][i].y >= 0) {
            res[keys[j]][i].y = 2;
          }
        }
      }
    }
    return res;
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
            ref={this.chessRenderer}
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
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <ResponsiveGridLayout
            width={this.state.width}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}}
            compactType={null}
            margin={[rowMargin,rowMargin]}
            rowHeight={rowHeight}
            layouts={this.state.layouts}
            onLayoutChange={(l,ls) => {
              store.set('player/layouts', this.transformLayout(ls, false));
              this.setState({
                layouts: this.layouts()
              });
            }}
          >
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
          </ResponsiveGridLayout>
        </div>
      </div>
    );
  }
}