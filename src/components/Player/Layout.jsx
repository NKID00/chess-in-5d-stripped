import React from 'react';

import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

import EmitterContext from 'EmitterContext';

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

//TODO: Find better layout update system
export default class Layout extends React.Component {
  static contextType = EmitterContext;
  lastUserChange = 0;
  state = {
    layouts: this.layouts(),
    width: 0,
    rowHeight: 0,
    rowMargin: 0,
    rowOffset: 0,
    triggerUpdate: 0,
  };
  defaultLayout() {
    return {
      lg: [
        {i: 'menu', x: 1, y: 1, w: 32, h: 9},
        {i: 'clock', x: 34, y: 1, w: 32, h: 9},
        {i: 'analyze', x: 34, y: 11, w: 32, h: 9},
        {i: 'tutorial', x: 67, y: 1, w: 32, h: 39},
        {i: 'settings', x: 1, y: 11, w: 32, h: 29},
        {i: 'notation', x: 1, y: -40, w: 32, h: 39},
        {i: 'view', x: 34, y: -10, w: 32, h: 9},
        {i: 'submit', x: 67, y: -10, w: 32, h: 9},
      ],
      md: [
        {i: 'menu', x: 1, y: 1, w: 32, h: 9},
        {i: 'clock', x: 34, y: 1, w: 32, h: 9},
        {i: 'analyze', x: 34, y: 11, w: 32, h: 9},
        {i: 'tutorial', x: 67, y: 1, w: 32, h: 39},
        {i: 'settings', x: 1, y: 11, w: 32, h: 29},
        {i: 'notation', x: 1, y: -40, w: 32, h: 39},
        {i: 'view', x: 34, y: -10, w: 32, h: 9},
        {i: 'submit', x: 67, y: -10, w: 32, h: 9},
      ],
      sm: [
        {i: 'menu', x: 1, y: 1, w: 32, h: 9},
        {i: 'clock', x: 34, y: 1, w: 32, h: 9},
        {i: 'analyze', x: 34, y: 11, w: 32, h: 9},
        {i: 'tutorial', x: 67, y: 1, w: 32, h: 39},
        {i: 'settings', x: 1, y: 11, w: 32, h: 29},
        {i: 'notation', x: 1, y: -40, w: 32, h: 39},
        {i: 'view', x: 34, y: -10, w: 32, h: 9},
        {i: 'submit', x: 67, y: -10, w: 32, h: 9},
      ],
      xs: [
        {i: 'menu', x: 1, y: 1, w: 32, h: 9},
        {i: 'clock', x: 34, y: 1, w: 32, h: 9},
        {i: 'analyze', x: 34, y: 11, w: 32, h: 9},
        {i: 'tutorial', x: 67, y: 1, w: 32, h: 39},
        {i: 'settings', x: 1, y: 11, w: 32, h: 29},
        {i: 'notation', x: 1, y: -40, w: 32, h: 39},
        {i: 'view', x: 34, y: -10, w: 32, h: 9},
        {i: 'submit', x: 67, y: -10, w: 32, h: 9},
      ],
      xxs: [
        {i: 'menu', x: 1, y: 1, w: 32, h: 9},
        {i: 'clock', x: 34, y: 1, w: 32, h: 9},
        {i: 'analyze', x: 34, y: 11, w: 32, h: 9},
        {i: 'tutorial', x: 67, y: 1, w: 32, h: 39},
        {i: 'settings', x: 1, y: 11, w: 32, h: 29},
        {i: 'notation', x: 1, y: -40, w: 32, h: 39},
        {i: 'view', x: 34, y: -10, w: 32, h: 9},
        {i: 'submit', x: 67, y: -10, w: 32, h: 9},
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
    var rowOffset = this.props.rowOffset ? this.props.rowOffset : 0;
    var rowHeight = (window.innerHeight - rowOffset) / 100;
    var rowMargin = rowHeight * 0.25;
    var layoutRowHeight = rowHeight - rowMargin;
    var layoutRowOffset = Math.ceil(rowOffset / (layoutRowHeight + rowMargin));
    this.setState({
      width: window.innerWidth,
      rowHeight: layoutRowHeight,
      rowMargin: rowMargin,
      rowOffset: layoutRowOffset,
    });
  }
  transformLayout(layout, importMode = true) {
    var res = deepcopy(layout);
    var keys = Object.keys(res);
    //Merge from stored layout when w and h are 1 or missing
    var storedLayout = store.get('player/layouts');
    for(var j = 0;j < keys.length;j++) {
      if(storedLayout && storedLayout[keys[j]]) {
        for(var k = 0;k < storedLayout[keys[j]].length;k++) {
          var includesItem = false;
          for(var i = 0;i < res[keys[j]].length;i++) {
            if(res[keys[j]][i].i === storedLayout[keys[j]][k].i) {
              includesItem = true;
              if(res[keys[j]][i].w === 1 && res[keys[j]][i].h === 1) {
                res[keys[j]][i] = storedLayout[keys[j]][k];
              }
            }
          }
          if(!includesItem) {
            res[keys[j]].push(storedLayout[keys[j]][k]);
          }
        }
      }
    }
    //Merge from defaultLayout
    var defaultLayout = this.defaultLayout();
    for(var j = 0;j < keys.length;j++) { // eslint-disable-line no-redeclare
      for(var k = 0;k < defaultLayout[keys[j]].length;k++) { // eslint-disable-line no-redeclare
        var includesItem = false; // eslint-disable-line no-redeclare
        for(var i = 0;i < res[keys[j]].length;i++) { // eslint-disable-line no-redeclare
          if(res[keys[j]][i].i === defaultLayout[keys[j]][k].i) {
            includesItem = true;
          }
        }
        if(!includesItem) {
          res[keys[j]].push(defaultLayout[keys[j]][k]);
        }
      }
    }
    //Transforming stored data into library usable layout data
    if(importMode) {
      for(var j = 0;j < keys.length;j++) { // eslint-disable-line no-redeclare
        for(var i = 0;i < res[keys[j]].length;i++) { // eslint-disable-line no-redeclare
          if(res[keys[j]][i].y < 0) {
            res[keys[j]][i].y = 100 + res[keys[j]][i].y;
          }
          if(res[keys[j]][i].y + res[keys[j]][i].h > 100) {
            if(res[keys[j]][i].y < 100) {
              res[keys[j]][i].h = 100 - res[keys[j]][i].y;
            }
            else if(res[keys[j]][i].h < 100) {
              res[keys[j]][i].y = 100 - res[keys[j]][i].h;
            }
            else {
              res[keys[j]][i].y = 99;
              res[keys[j]][i].h = 1;
            }
          }
          if(this.state) {
            res[keys[j]][i].y += this.state.rowOffset;
          }
        }
      }
    }
    //Transforming library returned layout data into stored data
    else {
      for(var j = 0;j < keys.length;j++) { // eslint-disable-line no-redeclare
        for(var i = 0;i < res[keys[j]].length;i++) { // eslint-disable-line no-redeclare
          if(this.state) {
            res[keys[j]][i].y -= this.state.rowOffset;
          }
          if(res[keys[j]][i].y + res[keys[j]][i].h > 100) {
            if(res[keys[j]][i].y < 100) {
              res[keys[j]][i].h = 100 - res[keys[j]][i].y;
            }
            else if(res[keys[j]][i].h < 100) {
              res[keys[j]][i].y = 100 - res[keys[j]][i].h;
            }
            else {
              res[keys[j]][i].y = 99;
              res[keys[j]][i].h = 1;
            }
          }
          if(res[keys[j]][i].y > 50) {
            res[keys[j]][i].y = -(100 - res[keys[j]][i].y);
          }
          //Removing 'null' keys
          if(res[keys[j]][i].i === 'null') {
            res[keys[j]].splice(i,1);
            i--;
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
    //Update state if layouts are changed externally (mainly for when layout is cleared)
    this.layoutListener = this.context.on('layoutUpdate', () => {
      this.setState({
        layouts: this.layouts()
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.rowOffset !== this.props.rowOffset) {
      this.resize();
    }
    if(
      prevState.rowHeight !== this.state.rowHeight ||
      prevState.rowMargin !== this.state.rowMargin ||
      prevState.rowOffset !== this.state.rowOffset
    ) {
      this.setState({
        layouts: this.layouts()
      });
    }
    //Dumbest update system since RGL is trash with checking for updates (forceUpdate did not work)
    if(prevState.triggerUpdate === 0 && this.state.triggerUpdate === 2) {
      this.setState({
        triggerUpdate: 1
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
    //Stop listening to external layout changes
    if(typeof this.layoutListener === 'function') { this.layoutListener(); }
  }
  render() {
    return (
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
          width={this.state.triggerUpdate > 1 ? this.state.width * 0.999 : this.state.width}
          autoSize
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 100, md: 100, sm: 100, xs: 100, xxs: 100}}
          compactType={null}
          margin={[this.state.rowMargin,this.state.rowMargin]}
          layouts={this.state.layouts}
          rowHeight={this.state.rowHeight}
          onLayoutChange={(l,ls) => {
            //Detecting if layout change was from user resizing
            if(Date.now() - this.lastUserChange < 100) {
              store.set('player/layouts', this.transformLayout(ls, false));
            }
            //Trigger a render update since most likely a new element was created (or destroyed)
            if(this.state.triggerUpdate === 0) {
              this.setState({
                layouts: this.layouts(),
                triggerUpdate: 2
              });
            }
            else if(this.state.triggerUpdate === 1) {
              this.setState({
                triggerUpdate: 0
              });
            }
          }}
          onDragStop={() => { this.lastUserChange = Date.now(); }}
          onResizeStop={() => { this.lastUserChange = Date.now(); }}
        >
          {this.props.children}
        </ResponsiveGridLayout>
      </div>
    );
  }
}