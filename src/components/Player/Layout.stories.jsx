import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import StorybookSandbox from 'components/StorybookSandbox';
import Layout from 'components/Player/Layout';

export default {
  title: 'components/Player/Layout',
  component: Layout,
  args: {
    rowOffset: 0,
    showMenu: true,
    showClock: true
  }
};

export const Main = (args) => {
  var displayComponents = [];
  if(args.showMenu) {
    displayComponents.push(
      <Card key='menu'>
        <CardContent>Menu</CardContent>
      </Card>
    );
  }
  if(args.showClock) {
    displayComponents.push(
      <Card key='clock'>
        <CardContent>Clock</CardContent>
      </Card>
    );
  }
  return (
    <StorybookSandbox>
      <Layout {...args}>
        {displayComponents}
        <Card key='analyze'>
          <CardContent>Analyze</CardContent>
        </Card>
        <Card key='tutorial'>
          <CardContent>Tutorial</CardContent>
        </Card>
        <Card key='settings'>
          <CardContent>Settings</CardContent>
        </Card>
        <Card key='notation'>
          <CardContent>Notation</CardContent>
        </Card>
        <Card key='view'>
          <CardContent>View</CardContent>
        </Card>
        <Card key='submit'>
          <CardContent>Submit</CardContent>
        </Card>
      </Layout>
    </StorybookSandbox>
  );
}
