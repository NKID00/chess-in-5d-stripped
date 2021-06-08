import React from 'react';

import Card from '@material-ui/core/Card';

import StorybookSandbox from 'components/StorybookSandbox';
import AnalyzeMenu from 'components/Player/AnalyzeMenu';

export default {
  title: 'components/Player/AnalyzeMenu',
  component: AnalyzeMenu
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <Card>
        <AnalyzeMenu {...args} />
      </Card>
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Card>
          <AnalyzeMenu {...args} />
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
          <AnalyzeMenu {...args} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}
