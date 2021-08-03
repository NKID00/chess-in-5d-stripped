import React from 'react';

import Card from '@material-ui/core/Card';

import StorybookSandbox from 'components/StorybookSandbox';
import QuickPlayMenu from 'route/Main/PlayMenu/QuickPlayMenu';

export default {
  title: 'route/Main/PlayMenu/QuickPlayMenu',
  component: QuickPlayMenu
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <QuickPlayMenu {...args} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <QuickPlayMenu {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <QuickPlayMenu {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const MainWithCard = (args) => {
  return (
    <StorybookSandbox>
      <Card>
        <QuickPlayMenu {...args} />
      </Card>
    </StorybookSandbox>
  );
}

export const Squeezed500pxWithCard = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Card>
          <QuickPlayMenu {...args} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250pxWithCard = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <Card>
          <QuickPlayMenu {...args} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}
