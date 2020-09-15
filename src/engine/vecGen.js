exports.generate = (maxTurn, minTimeline, maxTimeline, currPosition, vec) => {
  var res = [];
  for(var t = currPosition[0];t >= 1;t--) {
    var absT = Math.abs(currPosition[0] - t);
    for(var l = currPosition[1];l >= minTimeline;l--) {
      var absL = Math.abs(currPosition[1] - l);
      for(var r = currPosition[2];r >= 0;r--) {
        var absR = Math.abs(currPosition[2] - r);
        for(var f = currPosition[3];f >= 0;f--) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
        for(var f = currPosition[3];f <= 7;f++) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
      }
      for(var r = currPosition[2];r <= 7;r++) {
        var absR = Math.abs(currPosition[2] - r);
        for(var f = currPosition[3];f >= 0;f--) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
        for(var f = currPosition[3];f <= 7;f++) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
      }
    }
    for(var l = currPosition[1];l <= maxTimeline;l++) {
      var absL = Math.abs(currPosition[1] - l);
      for(var r = currPosition[2];r >= 0;r--) {
        var absR = Math.abs(currPosition[2] - r);
        for(var f = currPosition[3];f >= 0;f--) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
        for(var f = currPosition[3];f <= 7;f++) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
      }
      for(var r = currPosition[2];r <= 7;r++) {
        var absR = Math.abs(currPosition[2] - r);
        for(var f = currPosition[3];f >= 0;f--) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
        for(var f = currPosition[3];f <= 7;f++) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
      }
    }
  }
  for(var t = currPosition[0];t <= maxTurn;t++) {
    var absT = Math.abs(currPosition[0] - t);
    for(var l = currPosition[1];l >= minTimeline;l--) {
      var absL = Math.abs(currPosition[1] - l);
      for(var r = currPosition[2];r >= 0;r--) {
        var absR = Math.abs(currPosition[2] - r);
        for(var f = currPosition[3];f >= 0;f--) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
        for(var f = currPosition[3];f <= 7;f++) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
      }
      for(var r = currPosition[2];r <= 7;r++) {
        var absR = Math.abs(currPosition[2] - r);
        for(var f = currPosition[3];f >= 0;f--) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
        for(var f = currPosition[3];f <= 7;f++) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
      }
    }
    for(var l = currPosition[1];l <= maxTimeline;l++) {
      var absL = Math.abs(currPosition[1] - l);
      for(var r = currPosition[2];r >= 0;r--) {
        var absR = Math.abs(currPosition[2] - r);
        for(var f = currPosition[3];f >= 0;f--) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
        for(var f = currPosition[3];f <= 7;f++) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
      }
      for(var r = currPosition[2];r <= 7;r++) {
        var absR = Math.abs(currPosition[2] - r);
        for(var f = currPosition[3];f >= 0;f--) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
        for(var f = currPosition[3];f <= 7;f++) {
          var absF = Math.abs(currPosition[3] - f);
          var isInVec = true;
          if(isInVec) { isInVec = absT === vec[0]; }
          if(isInVec) { isInVec = absL === vec[1]; }
          if(isInVec) { isInVec = absR === vec[2]; }
          if(isInVec) { isInVec = absF === vec[3]; }
          if(isInVec) { res.push([t, l, r, f]); }
        }
      }
    }
  }
  return res;
}
