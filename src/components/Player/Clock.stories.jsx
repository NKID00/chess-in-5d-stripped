import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import Clock from 'components/Player/Clock';

export default {
  title: 'components/Player/Clock',
  component: Clock,
  args: {
    whiteActive: true,
    whiteTimeLeft: 2*60*1000,
    whiteDelayLeft: 5*1000,
    blackTimeLeft: 2*60*1000,
    blackDelayLeft: 5*1000
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <Clock {...args} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Clock {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <Clock {...args} />
      </div>
    </StorybookSandbox>
  );
}