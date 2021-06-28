import React from 'react';

import Card from '@material-ui/core/Card';

import StorybookSandbox from 'components/StorybookSandbox';
import AnalyzeMenu from 'components/Player/AnalyzeMenu';
import Clock from 'components/Player/Clock';
import DrawMenu from 'components/Player/DrawMenu';
import Layout from 'components/Player/Layout';
import Menu from 'components/Player/Menu';
import Status from 'components/Player/Status';
import Notation from 'components/Player/Notation';
import SettingsMenu from 'components/Player/SettingsMenu';
import SubmitMenu from 'components/Player/SubmitMenu';
import TutorialMenu from 'components/Player/TutorialMenu';
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

const defaultText = `#### h4 Heading
##### h5 Heading
###### h6 Heading`;

export default {
  title: 'components/Player/Layout',
  component: Layout,
  args: {
    rowOffset: 0,
    showMenu: true,
    showClock: true,
    showDraw: true,
    showAnalyze: true,
    showTutorial: true,
    showSettings: true,
    showNotation: true,
    showStatus: true,
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
          showStatusButton
          showSubmitButton
          showViewButton
          showClockButton
          showTutorialButton
          showNotationButton
          showAnalyzeButton
          showDrawButton
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
        <TutorialMenu displayText={defaultText} allowNext allowBack />
      </Card>
    );
  }
  if(args.showDraw) {
    displayComponents.push(
      <Card key='draw'>
        <DrawMenu />
      </Card>
    );
  }
  if(args.showSettings) {
    displayComponents.push(
      <Card key='settings'>
        <SettingsMenu />
      </Card>
    );
  }
  if(args.showStatus) {
    displayComponents.push(
      <Card key='status'>
        <Status
          whitePlayerName='White'
          whitePlayerType='human'
          blackPlayerName='Black'
          blackPlayerType='human'
          whiteActive={true}
        />
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
