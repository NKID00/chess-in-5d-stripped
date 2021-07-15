import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import StorybookSandbox from 'components/StorybookSandbox';
import HotkeyPicker from 'components/HotkeyPicker';

export default {
  title: 'components/HotkeyPicker',
  component: HotkeyPicker,
  args: {
    hotkeyTarget: 'undo',
    label: 'Hotkey: Undo'
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <HotkeyPicker {...args} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <HotkeyPicker {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <HotkeyPicker {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const MainWithCard = (args) => {
  return (
    <StorybookSandbox>
      <Card>
        <CardContent>
          <HotkeyPicker {...args} />
        </CardContent>
      </Card>
    </StorybookSandbox>
  );
}

export const Squeezed500pxWithCard = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Card>
          <CardContent>
            <HotkeyPicker {...args} />
          </CardContent>
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
          <CardContent>
            <HotkeyPicker {...args} />
          </CardContent>
        </Card>
      </div>
    </StorybookSandbox>
  );
}