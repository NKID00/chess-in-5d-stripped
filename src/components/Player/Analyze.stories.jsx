import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import Analyze from 'components/Player/Analyze';

export default {
  title: 'components/Player/Analyze',
  component: Analyze
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <Analyze {...args} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Analyze {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <Analyze {...args} />
      </div>
    </StorybookSandbox>
  );
}
