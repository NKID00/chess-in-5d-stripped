import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import Menu from 'components/Player/Menu';

export default {
  title: 'components/Player/Menu',
  component: Menu,
  args: {
    showClock: false,
    showNotation: false
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <Menu {...args} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Menu {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <Menu {...args} />
      </div>
    </StorybookSandbox>
  );
}
