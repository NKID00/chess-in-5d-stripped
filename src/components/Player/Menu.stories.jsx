import React from 'react';

import Card from '@material-ui/core/Card';

import StorybookSandbox from 'components/StorybookSandbox';
import Menu from 'components/Player/Menu';

export default {
  title: 'components/Player/Menu',
  component: Menu,
  args: {
    showStatus: false,
    showStatusButton: true,
    showSubmit: false,
    showSubmitButton: true,
    showView: false,
    showViewButton: true,
    showClock: false,
    showClockButton: true,
    showDraw: false,
    showDrawButton: true,
    showTutorial: false,
    showTutorialButton: true,
    showNotation: false,
    showNotationButton: true,
    showAnalyze: false,
    showAnalyzeButton: true,
    showSettings: false,
    showSettingsButton: true,
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <Card>
        <Menu {...args} />
      </Card>
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Card>
          <Menu {...args} />
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
          <Menu {...args} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}
