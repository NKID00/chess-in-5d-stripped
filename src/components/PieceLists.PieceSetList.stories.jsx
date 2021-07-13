import React from 'react';

import StorybookSandbox from 'components/StorybookSandbox';
import { PieceSetList } from 'components/PieceLists';

export default {
  title: 'components/PieceLists.PieceSetList',
  component: PieceSetList
};

export const Main = (args) => {
  return (
    <StorybookSandbox>
      <PieceSetList {...args} emitter={null} />
    </StorybookSandbox>
  );
}

export const Squeezed500px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <PieceSetList {...args} emitter={null} />
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250px = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <PieceSetList {...args} emitter={null} />
      </div>
    </StorybookSandbox>
  );
}
