import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import NotationSegment from 'components/Player/Notation/NotationLine/NotationSegment';

const defaultTestNotation = `(4T12)Qe3>(3T12)f4`;

export default {
  title: 'components/Player/NotationSegment',
  component: NotationSegment,
  args: {
    notationSegment: defaultTestNotation,
    isWhite: true,
    fontFamily: 'roboto mono',
    fontSize: 12,
    newPresentToken: true,
    newPresentTokenBackgroundColor: '#56b056',
    newPresentTokenColor: '#ffffff',
    newTimelineToken: true,
    newTimelineTokenBackgroundColor: '#1f8ed5',
    newTimelineTokenColor: '#ffffff',
    highlight: false,
    highlightSize: 3,
    highlightColor: '#b194e1',
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <NotationSegment {...args} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <NotationSegment {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <NotationSegment {...args} />
      </div>
    </StorybookSandbox>
  );
}
