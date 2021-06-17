import React from 'react';

import Card from '@material-ui/core/Card';

import StorybookSandbox from 'components/StorybookSandbox';
import SettingsMenu from 'components/Player/SettingsMenu';

export default {
  title: 'components/Player/SettingsMenu',
  component: SettingsMenu,
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <Card>
        <SettingsMenu {...args} />
      </Card>
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Card>
          <SettingsMenu {...args} />
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
          <SettingsMenu {...args} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}