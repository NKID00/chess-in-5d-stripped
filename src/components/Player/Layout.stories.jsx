import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import StorybookSandbox from 'components/StorybookSandbox';
import AnalyzeMenu from 'components/Player/AnalyzeMenu';
import Clock from 'components/Player/Clock';
import Layout from 'components/Player/Layout';
import Menu from 'components/Player/Menu';
import Notation from 'components/Player/Notation';
import SubmitMenu from 'components/Player/SubmitMenu';
import ViewMenu from 'components/Player/ViewMenu';

const defaultTestNotation = `[Board "Standard"]
[Mode "5D"]
1. b3 / g5
2. h4 / Bg7
3. a3 / e5
4. d4 / g4
5. b4 / Kf8
6. Bf4 / Ne7 7. c4 / Ng8
8. Qd3 {test comment here [test tag]}`;

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
        <Menu
          {...args}
          showSubmitButton
          showViewButton
          showClockButton
          showTutorialButton
          showNotationButton
          showAnalyzeButton
          showSettingsButton
        />
      </Card>
    );
  }
  if(args.showClock) {
    displayComponents.push(
      <Card key='clock'>
        <Clock />
      </Card>
    );
  }
  if(args.showAnalyze) {
    displayComponents.push(
      <Card key='analyze'>
        <AnalyzeMenu />
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
        <Notation notation={defaultTestNotation} />
      </Card>
    );
  }
  if(args.showView) {
    displayComponents.push(
      <Card key='view'>
        <ViewMenu />
      </Card>
    );
  }
  if(args.showSubmit) {
    displayComponents.push(
      <Card key='submit'>
        <SubmitMenu />
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
