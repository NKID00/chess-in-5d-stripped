import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Basics from 'uiTree/tutorials/Basics';
import RulesPopup from 'uiTree/tutorials/RulesPopup';

export default class Tutorial extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/tutorial/basics'>
          <Basics />
        </Route>
        <Route exact path='/tutorial/rules'>
          <RulesPopup />
        </Route>
      </Switch>
    );
  }
}
