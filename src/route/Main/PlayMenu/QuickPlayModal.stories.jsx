import React from 'react';

import Card from '@material-ui/core/Card';

import StorybookSandbox from 'components/StorybookSandbox';
import QuickPlayModal from 'route/Main/PlayMenu/QuickPlayModal';

export default {
  title: 'route/Main/PlayMenu/QuickPlayModal',
  component: QuickPlayModal,
  args: {
    open: true,
    found: false,
    totalPlayers: 0
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <QuickPlayModal {...args} />
    </StorybookSandbox>
  );
}
