import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import NotationLine from 'components/Player/Notation/NotationLine';

const defaultTestNotation = `22. (4T12)Qe3>(3T12)f4 (-4T12)a4=Q (8T12)Qg5>>(3T12)g5~ (~T11) (>L11) (-12T11)O-O / (-12T11)c5 (8T12)O-O-O {test comment here}`;

export default {
  title: 'components/Player/NotationLine',
  component: NotationLine,
  args: {
    notationLine: defaultTestNotation,
    fontFamily: 'roboto mono',
    fontSize: 12,
    activateTimelineToken: true,
    activateTimelineTokenBackgroundColor: '#007800',
    activateTimelineTokenColor: '#ffffff',
    newTimelineToken: true,
    newTimelineTokenBackgroundColor: '#1f8ed5',
    newTimelineTokenColor: '#ffffff',
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <NotationLine {...args} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <NotationLine {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <NotationLine {...args} />
      </div>
    </StorybookSandbox>
  );
}
