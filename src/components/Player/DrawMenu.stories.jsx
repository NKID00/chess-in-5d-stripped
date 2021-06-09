import React from 'react';

import Card from '@material-ui/core/Card';

import StorybookSandbox from 'components/StorybookSandbox';
import DrawMenu from 'components/Player/DrawMenu';

export default {
  title: 'components/Player/DrawMenu',
  component: DrawMenu,
  args: {
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <Card>
        <DrawMenu {...args} />
      </Card>
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Card>
          <DrawMenu {...args} />
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
          <DrawMenu {...args} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}