import React from 'react';

import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

import EmitterContext from 'EmitterContext';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const deepcopy = require('deepcopy');
const store = require('store');

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
        {i: 'menu', x: 0, y: 0, w: 4, h: 1},
        {i: 'clock', x: 4, y: 0, w: 4, h: 1},
        {i: 'analyze', x: 4, y: 0, w: 4, h: 1},
        {i: 'tutorial', x: 8, y: 0, w: 4, h: 4},
        {i: 'draw', x: 0, y: 1, w: 4, h: 1},
        {i: 'settings', x: 0, y: 1, w: 4, h: 3},
        {i: 'notation', x: 0, y: -4, w: 4, h: 4},
        {i: 'status', x: 4, y: -2, w: 4, h: 1},
        {i: 'view', x: 4, y: -1, w: 4, h: 1},
        {i: 'submit', x: 8, y: -1, w: 4, h: 1},
      ],
      md: [
        {i: 'menu', x: 0, y: 0, w: 4, h: 1},
        {i: 'clock', x: 4, y: 0, w: 4, h: 1},
        {i: 'analyze', x: 4, y: 0, w: 4, h: 1},
        {i: 'tutorial', x: 8, y: 0, w: 4, h: 4},
        {i: 'draw', x: 0, y: 1, w: 4, h: 1},
        {i: 'settings', x: 0, y: 1, w: 4, h: 3},
        {i: 'notation', x: 0, y: -4, w: 4, h: 4},
        {i: 'status', x: 4, y: -2, w: 4, h: 1},
        {i: 'view', x: 4, y: -1, w: 4, h: 1},
        {i: 'submit', x: 8, y: -1, w: 4, h: 1},
      ],
      sm: [
        {i: 'menu', x: 0, y: 0, w: 4, h: 1},
        {i: 'clock', x: 4, y: 0, w: 4, h: 1},
        {i: 'analyze', x: 4, y: 0, w: 4, h: 1},
        {i: 'tutorial', x: 8, y: 0, w: 4, h: 4},
        {i: 'draw', x: 0, y: 1, w: 4, h: 1},
        {i: 'settings', x: 0, y: 1, w: 4, h: 3},
        {i: 'notation', x: 0, y: -4, w: 4, h: 4},
        {i: 'status', x: 4, y: -2, w: 4, h: 1},
        {i: 'view', x: 4, y: -1, w: 4, h: 1},
        {i: 'submit', x: 8, y: -1, w: 4, h: 1},
      ],
      xs: [
        {i: 'menu', x: 0, y: 0, w: 4, h: 1},
        {i: 'clock', x: 4, y: 0, w: 4, h: 1},
        {i: 'analyze', x: 4, y: 0, w: 4, h: 1},
        {i: 'tutorial', x: 8, y: 0, w: 4, h: 4},
        {i: 'draw', x: 0, y: 1, w: 4, h: 1},
        {i: 'settings', x: 0, y: 1, w: 4, h: 3},
        {i: 'notation', x: 0, y: -4, w: 4, h: 4},
        {i: 'status', x: 4, y: -2, w: 4, h: 1},
        {i: 'view', x: 4, y: -1, w: 4, h: 1},
        {i: 'submit', x: 8, y: -1, w: 4, h: 1},
      ],
      xxs: [
        {i: 'menu', x: 0, y: 0, w: 4, h: 1},
        {i: 'clock', x: 4, y: 0, w: 4, h: 1},
        {i: 'analyze', x: 4, y: 0, w: 4, h: 1},
        {i: 'tutorial', x: 8, y: 0, w: 4, h: 4},
        {i: 'draw', x: 0, y: 1, w: 4, h: 1},
        {i: 'settings', x: 0, y: 1, w: 4, h: 3},
        {i: 'notation', x: 0, y: -4, w: 4, h: 4},
        {i: 'status', x: 4, y: -2, w: 4, h: 1},
        {i: 'view', x: 4, y: -1, w: 4, h: 1},
        {i: 'submit', x: 8, y: -1, w: 4, h: 1},
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
    var rowHeight = window.innerHeight / 12;
    if(typeof this.props.height === 'number') {
      rowHeight = this.props.height / 12;
    }
    var rowMargin = rowHeight * 0.15;
    var layoutRowHeight = rowHeight - rowMargin - (rowMargin * (1/12));
    this.setState({
      width: this.props.width ? this.props.width : window.innerWidth,
      rowHeight: layoutRowHeight,
      rowMargin: rowMargin,
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
          var newItem = defaultLayout[keys[j]][k];
          newItem.default = true;
          res[keys[j]].push(newItem);
        }
      }
    }
    //Transforming stored data into library usable layout data
    if(importMode) {
      for(var j = 0;j < keys.length;j++) { // eslint-disable-line no-redeclare
        for(var i = 0;i < res[keys[j]].length;i++) { // eslint-disable-line no-redeclare
          if(res[keys[j]][i].y < 0) {
            res[keys[j]][i].y = Math.abs(12 + res[keys[j]][i].y) % 12;
          }
          if(!res[keys[j]][i].default) {
            if(res[keys[j]][i].y + res[keys[j]][i].h > 12) {
              if(res[keys[j]][i].y < 12) {
                res[keys[j]][i].h = 12 - res[keys[j]][i].y;
              }
              else if(res[keys[j]][i].h < 12) {
                res[keys[j]][i].y = 12 - res[keys[j]][i].h;
              }
              else {
                res[keys[j]][i].y = 11;
                res[keys[j]][i].h = 1;
              }
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
          if(!res[keys[j]][i].default) {
            if(this.state) {
              if(res[keys[j]][i].y < this.state.rowOffset) {
                res[keys[j]][i].y += this.state.rowOffset;
              }
              res[keys[j]][i].y -= this.state.rowOffset;
            }
            if(res[keys[j]][i].y + res[keys[j]][i].h > 12) {
              if(res[keys[j]][i].y < 12) {
                res[keys[j]][i].h = 12 - res[keys[j]][i].y;
              }
              else if(res[keys[j]][i].h < 12) {
                res[keys[j]][i].y = 12 - res[keys[j]][i].h;
              }
              else {
                res[keys[j]][i].y = -1;
                res[keys[j]][i].h = 1;
              }
            }
            if(res[keys[j]][i].y > 6) {
              res[keys[j]][i].y = -(12 - res[keys[j]][i].y);
            }
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
    if(
      prevProps.x !== this.props.x ||
      prevProps.y !== this.props.y ||
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    ) {
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
          left: this.props.x ? this.props.x : 0,
          top: this.props.y ? this.props.y : 0,
          width: this.props.width ? `${this.props.width}px` : '100%',
          height: this.props.height ? `${this.props.height}px` : '100%',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
        }}
      >
        <ResponsiveGridLayout
          width={this.state.triggerUpdate > 1 ? this.state.width * 0.999 : this.state.width}
          autoSize
          preventCollision
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 12, md: 12, sm: 12, xs: 12, xxs: 12}}
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
          onDragStop={() => {
            this.context.emit('layoutDragUpdate');
            this.lastUserChange = Date.now();
          }}
          onResizeStop={() => {
            this.context.emit('layoutResizeUpdate');
            this.lastUserChange = Date.now();
          }}
        >
          {this.props.children}
        </ResponsiveGridLayout>
      </div>
    );
  }
}