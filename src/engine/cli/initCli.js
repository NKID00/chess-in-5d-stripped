require('module-alias/register');

var repl = require('repl');
var r = repl.start('node> ');
r.context.initGameState = require('@local/engine/defs/initGameState');
r.context.moveGen = require('@local/engine/move/moveGen');
r.context.moveState = require('@local/engine/move/moveState');
r.context.textRender = require('@local/engine/cli/textRender');

/*
var m = moveGen.possibleMoveGen(initGameState);
var ns = moveState.modifyStateWithMove(initGameState, m[0]);
ns.playerAction = 'black';
m = moveGen.possibleMoveGen(ns);
ns = moveState.modifyStateWithMove(ns, m[0]);
ns.playerAction = 'white';
m = moveGen.possibleMoveGen(ns);
ns = moveState.modifyStateWithMove(ns, m[3]);
ns.playerAction = 'black';
m = moveGen.possibleMoveGen(ns);
ns = moveState.modifyStateWithMove(ns, m[3]);
ns.playerAction = 'white';
var nsa = textRender.createStateStrArr(ns, false, true);
textRender.printStateArr(nsa);
*/
