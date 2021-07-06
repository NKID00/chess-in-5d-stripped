import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import GameCard from 'components/GameCard';

export default {
  title: 'components/GameCard',
  component: GameCard
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <GameCard {...args} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <GameCard {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <GameCard {...args} />
      </div>
    </StorybookSandbox>
  );
}
