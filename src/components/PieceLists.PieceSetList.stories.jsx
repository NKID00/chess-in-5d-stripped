import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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

export const MainWithCard = (args) => {
  return (
    <StorybookSandbox>
      <Card>
        <CardContent>
          <PieceSetList {...args} emitter={null} />
        </CardContent>
      </Card>
    </StorybookSandbox>
  );
}

export const Squeezed500pxWithCard = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 500 }}>
        <Card>
          <CardContent>
            <PieceSetList {...args} emitter={null} />
          </CardContent>
        </Card>
      </div>
    </StorybookSandbox>
  );
}

export const Squeezed250pxWithCard = (args) => {
  return (
    <StorybookSandbox>
      <div style={{ width: 250 }}>
        <Card>
          <CardContent>
            <PieceSetList {...args} emitter={null} />
          </CardContent>
        </Card>
      </div>
    </StorybookSandbox>
  );
}