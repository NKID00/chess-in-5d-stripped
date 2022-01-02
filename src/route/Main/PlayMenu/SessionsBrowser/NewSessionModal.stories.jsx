import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import NewSessionModal from 'route/Main/PlayMenu/SessionsBrowser/NewSessionModal';

export default {
  title: 'route/Main/PlayMenu/SessionsBrowser/NewSessionModal',
  component: NewSessionModal,
  args: {
    open: true
  }
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <NewSessionModal {...args} />
    </StorybookSandbox>
  );
}
