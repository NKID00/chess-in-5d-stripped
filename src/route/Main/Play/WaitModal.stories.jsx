import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import WaitModal from 'route/Main/Play/WaitModal';

export default {
  title: 'route/Main/Play/WaitModal',
  component: WaitModal,
  args: {
    session: {
      host: '',
      white: '',
      black: '',
      ready: false,
      requestJoin: [],
      start: false
    }
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <WaitModal {...args} />
    </StorybookSandbox>
  );
}
