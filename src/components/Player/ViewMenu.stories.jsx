import React from 'react';

import Card from '@material-ui/core/Card';

import StorybookSandbox from 'components/StorybookSandbox';
import ViewMenu from 'components/Player/ViewMenu';

export default {
  title: 'components/Player/ViewMenu',
  component: ViewMenu
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <Card>
        <ViewMenu {...args} />
      </Card>
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Card>
          <ViewMenu {...args} />
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
          <ViewMenu {...args} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}
