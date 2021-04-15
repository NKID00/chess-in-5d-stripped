import React from 'react';

import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Renderer from 'components/player/Renderer';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

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
export default class Player extends React.Component {
  rootRef=React.createRef();
  chessRenderer = React.createRef();
  state = {
    layouts: this.layouts(),
    width: 1280
  };
  defaultLayout() {
    return {
      lg: [
        {i: 'clock', x: 4, y: 2, w: 4, h: 2}
      ],
      md: [
        {i: 'clock', x: 3, y: 2, w: 4, h: 2}
      ],
      sm: [
        {i: 'clock', x: 2, y: 2, w: 2, h: 2}
      ],
      xs: [
        {i: 'clock', x: 1, y: 2, w: 2, h: 2}
      ],
      xxs: [
        {i: 'clock', x: 0, y: 2, w: 2, h: 2}
      ],
    };
  }
  layouts() {
    if(typeof store.get('player/layouts') === 'object') {
      return store.get('player/layouts');
    }
    return this.defaultLayout();
  }
  resize() {
    this.rootRef.current.style.width = `${window.innerWidth}px`;
    this.rootRef.current.style.height = `${window.innerHeight}px`;
    this.chessRenderer.current.refreshAttach();
    this.setState({ width: window.innerWidth });
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
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
          }}
        >
          <Renderer
            ref={this.chessRenderer}
            height={1}
            width={1}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 3000,
          }}
        >
          <ResponsiveGridLayout
            width={this.state.width}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            compactType={null}
            rowHeight={30}
            layouts={this.state.layouts}
            onLayoutChange={(l,ls) => {
              store.set('player/layouts', ls);
              this.setState({
                layouts: this.layouts()
              });
            }}
          >
            <Card key='clock'>
              <CardContent>Clock</CardContent>
            </Card>
          </ResponsiveGridLayout>
        </div>
      </div>
    );
  }
}