import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Basics from 'uiTree/tutorials/Basics';
import Movement from 'uiTree/tutorials/Movement';
import Movement2 from 'uiTree/tutorials/Movement2';
import Checkmate from 'uiTree/tutorials/Checkmate';
//import RulesPopup from 'uiTree/tutorials/RulesPopup';

export default class Tutorial extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/tutorial/basics'>
          <Basics />
        </Route>
        <Route exact path='/tutorial/movement'>
          <Movement />
        </Route>
        <Route exact path='/tutorial/movement2'>
          <Movement2 />
        </Route>
        <Route exact path='/tutorial/checkmate'>
          <Checkmate />
        </Route>
      </Switch>
    );
  }
}
