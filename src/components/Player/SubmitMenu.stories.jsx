import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import SubmitMenu from 'components/Player/SubmitMenu';

export default {
  title: 'components/Player/SubmitMenu',
  component: SubmitMenu
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <SubmitMenu {...args} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <SubmitMenu {...args} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <SubmitMenu {...args} />
      </div>
    </StorybookSandbox>
  );
}
