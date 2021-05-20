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
    showClock: true,
    showAnalyze: true,
    showTutorial: true,
    showSettings: true,
    showNotation: true,
    showView: true,
    showSubmit: true
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
  if(args.showAnalyze) {
    displayComponents.push(
      <Card key='analyze'>
        <CardContent>Analyze</CardContent>
      </Card>
    );
  }
  if(args.showTutorial) {
    displayComponents.push(
      <Card key='tutorial'>
        <CardContent>Tutorial</CardContent>
      </Card>
    );
  }
  if(args.showSettings) {
    displayComponents.push(
      <Card key='settings'>
        <CardContent>Settings</CardContent>
      </Card>
    );
  }
  if(args.showNotation) {
    displayComponents.push(
      <Card key='notation'>
        <CardContent>Notation</CardContent>
      </Card>
    );
  }
  if(args.showView) {
    displayComponents.push(
      <Card key='view'>
        <CardContent>View</CardContent>
      </Card>
    );
  }
  if(args.showSubmit) {
    displayComponents.push(
      <Card key='submit'>
        <CardContent>Submit</CardContent>
      </Card>
    );
  }
  return (
    <StorybookSandbox>
        <Layout {...args}>
          {displayComponents}
        </Layout>
    </StorybookSandbox>
  );
}
