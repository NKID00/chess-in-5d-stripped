import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import QuickPlayModal from 'route/Main/PlayMenu/QuickPlayModal';

export default {
  title: 'route/Main/PlayMenu/QuickPlayModal',
  component: QuickPlayModal,
  args: {
    open: true,
    ranked: false,
    found: false,
    opponentTimeout: false,
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
