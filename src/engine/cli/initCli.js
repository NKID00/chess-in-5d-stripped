require('module-alias/register');

var repl = require('repl');
var r = repl.start('node> ');
r.context.initGameState = require('@local/engine/defs/initGameState');
r.context.moveGen = require('@local/engine/move/moveGen');
r.context.moveState = require('@local/engine/move/moveState');
