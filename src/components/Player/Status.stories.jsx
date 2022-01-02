import React from 'react';

import Card from '@material-ui/core/Card';

import StorybookSandbox from 'components/StorybookSandbox';
import Status from 'components/Player/Status';

export default {
  title: 'components/Player/Status',
  component: Status,
  args: {
    whitePlayerName: 'Test1',
    whitePlayerType: 'human',
    blackPlayerName: 'Test2',
    blackPlayerType: 'bot',
    whiteActive: true,
    isLoading: false,
    isLoadingPlayer: false,
    isCheck: false,
    isCheckmate: false,
    isStalemate: false,
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <Card>
        <Status {...args} />
      </Card>
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Card>
          <Status {...args} />
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
          <Status {...args} />
        </Card>
      </div>
    </StorybookSandbox>
  );
}