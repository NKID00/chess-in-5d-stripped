import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import Player from 'components/Player';

export default {
  title: 'components/Player/Player',
  component: Player,
  args: {
    statusWhitePlayerName: 'White',
    statusWhitePlayerType: 'human',
    statusBlackPlayerName: 'Black',
    statusBlackPlayerType: 'human',
    statusWhiteActive: true
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <Player {...args} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Player {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <Player {...args} />
      </div>
    </StorybookSandbox>
  );
}
