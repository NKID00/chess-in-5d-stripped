const deepcopy = require('deep-copy');

const stateActivateTimelines = (gameState) => {
  var newGameState = deepcopy(gameState);
  var maxTimeline = 0;
  var minTimeline = 0;
  for(var i = 0;i < newGameState.timelines.length;i++) {
    if(newGameState.timelines[i].timeline > maxTimeline) {
      maxTimeline = newGameState.timelines[i].timeline;
    }
    if(newGameState.timelines[i].timeline < minTimeline) {
      minTimeline = newGameState.timelines[i].timeline;
    }
  }
  for(var i = 0;i < newGameState.timelines.length;i++) {
    if(newGameState.timelines[i].timeline > (-1 * minTimeline)) {
      newGameState.timelines[i].active = false;
    }
    else if(newGameState.timelines[i].timeline < (-1 * maxTimeline)) {
      newGameState.timelines[i].active = false;
    }
    else {
      newGameState.timelines[i].active = true;
    }
  }
  return newGameState;
}

exports.stateActivateTimelines = stateActivateTimelines;
