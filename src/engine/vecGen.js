exports.generate = (maxTurn, minTimeline, maxTimeline, currPosition, vec) => {
  var res = [];
  var blocked = false;
  var newPosition = currPosition.slice();
  while(!blocked) {
    newPosition[0] += vec[0];
    newPosition[1] += vec[1];
    newPosition[2] += vec[2];
    newPosition[3] += vec[3];

    blocked = true;
    if(newPosition[0] >= 1 && newPosition[0] <= maxTurn) {
      if(newPosition[1] >= minTimeline && newPosition[1] <= maxTimeline) {
        if(newPosition[2] >= 0 && newPosition[2] <= 7) {
          if(newPosition[3] >= 0 && newPosition[3] <= 7) {
            res.push(newPosition.slice());
            blocked = false;
          }
        }
      }
    }
  }
  return res;
}
