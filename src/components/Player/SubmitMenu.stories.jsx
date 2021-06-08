import React from 'react';

import Card from '@material-ui/core/Card';

import StorybookSandbox from 'components/StorybookSandbox';
import SubmitMenu from 'components/Player/SubmitMenu';

export default {
  title: 'components/Player/SubmitMenu',
  component: SubmitMenu
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <Card>
        <SubmitMenu {...args} />
      </Card>
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Card>
          <SubmitMenu {...args} />
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
          <SubmitMenu {...args} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}
