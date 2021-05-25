import React from 'react';

import Card from '@material-ui/core/Card';

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
      <Card>
        <Clock {...args} />
      </Card>
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Card>
          <Clock {...args} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <Card>
          <Clock {...args} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}