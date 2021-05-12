import React from 'react';

import Sandbox from 'components/StorybookSandbox';
import Notation from 'components/Player/Notation';

export default {
  title: 'components/Player/Notation',
  component: Notation,
};

export const Main = () => {
  return (
    <Sandbox>
      <Notation />
    </Sandbox>
  );
}