import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import SessionCard from 'components/SessionCard';

export default {
  title: 'components/SessionCard',
  component: SessionCard,
  args: {
    whitePlayerName: 'Player 1',
    whitePlayerType: 'human',
    blackPlayerName: 'Player 2',
    blackPlayerType: 'bot',
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <SessionCard {...args} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <SessionCard {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <SessionCard {...args} />
      </div>
    </StorybookSandbox>
  );
}
