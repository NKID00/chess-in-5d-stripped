import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import ViewMenu from 'components/Player/ViewMenu';

export default {
  title: 'components/Player/ViewMenu',
  component: ViewMenu
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <ViewMenu {...args} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <ViewMenu {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <ViewMenu {...args} />
      </div>
    </StorybookSandbox>
  );
}
