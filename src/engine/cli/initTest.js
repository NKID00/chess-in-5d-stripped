require('module-alias/register');

const deepcopy = require('deep-copy');
const initGameState = require('@local/engine/defs/initGameState');
const moveGen = require('@local/engine/move/moveGen');
const moveState = require('@local/engine/move/moveState');
const actionGen = require('@local/engine/action/actionGen');
const actionState = require('@local/engine/action/actionState');
const textRender = require('@local/engine/cli/textRender');
const notationUtils = require('@local/engine/notationUtils');
const stateUtils = require('@local/engine/stateUtils');

var ns = deepcopy(initGameState);
var nextRandom = () => {
  var actions = actionGen.possibleActionGen(ns);
  console.log('Action length: ' + actions.length);
  var action = actions[Math.floor(Math.random() * actions.length)];
  console.log(notationUtils.notationGetNotationFromAction(ns, action));
  ns = actionState.stateAdvanceAction(ns, action);
  var nsa = textRender.createStateStrArr(ns, false, true);
  textRender.printStateArr(nsa);
}
for(var i = 0;i < 20;i++) {
  nextRandom();
}
