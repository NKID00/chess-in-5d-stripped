require('module-alias/register');

var repl = require('repl');
var r = repl.start('node> ');
r.context.deepcopy = require('deep-copy');
r.context.initGameState = require('@local/engine/defs/initGameState');
r.context.moveGen = require('@local/engine/move/moveGen');
r.context.moveState = require('@local/engine/move/moveState');
r.context.actionGen = require('@local/engine/action/actionGen');
r.context.actionState = require('@local/engine/action/actionState');
r.context.textRender = require('@local/engine/cli/textRender');
r.context.notationUtils = require('@local/engine/notationUtils');
r.context.stateUtils = require('@local/engine/stateUtils');

/*
var m = moveGen.possibleMoveGen(initGameState);
var ns = moveState.stateModify(initGameState, m[0]);
ns.playerAction = 'black';
m = moveGen.possibleMoveGen(ns);
ns = moveState.stateModify(ns, m[0]);
ns.playerAction = 'white';
ns.action++;
m = moveGen.possibleMoveGen(ns);
ns = moveState.stateModify(ns, m[3]);
ns.playerAction = 'black';
m = moveGen.possibleMoveGen(ns);
ns = moveState.stateModify(ns, m[3]);
ns.playerAction = 'white';
ns.action++;
m = moveGen.possibleMoveGen(ns);
var nsa = textRender.createStateStrArr(ns, false, true);
notationUtils.notationGetNotationFromMove(ns,m[0]);
//textRender.printStateArr(nsa);
*/

/*
var ns = deepcopy(initGameState);
for(var i = 0;i < 20;i++) {
  var nsa = textRender.createStateStrArr(ns, false, true);
  textRender.printStateArr(nsa);
  var actions = actionGen.possibleActionGen(ns);
  console.log('Action length: ' + actions.length);
  var action = actions[Math.floor(Math.random() * actions.length)];
  console.log(notationUtils.notationGetNotationFromAction(ns, action));
  ns = actionState.stateAdvanceAction(ns, action);
}
*/

/*
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
*/
