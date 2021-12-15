import Chess from '5d-chess-js';

export const extractHighlightNotation = (notationArr, notation, highlightNotation) => {
  //Searching for last move and looking for notation string to highlight
  try {
    var chess = new Chess();
    chess.skipDetection = true;
    chess.import(highlightNotation);
    var hash = chess.hash.slice();

    //Check if highlight matches current displayed notation (skip if matches)
    chess.import(notation);
    if(hash !== chess.hash) {
      var currTmpChess = chess.copy();
      currTmpChess.reset();

      //Create array of notation segments
      var tmpNotationArr = [];
      for(var i = 0;i < notationArr.length;i++) {
        tmpNotationArr.push(notationArr[i].includes('[') ? notationArr[i] : notationArr[i].split(' '));
      }
      tmpNotationArr = tmpNotationArr.flat();

      //Test notation segments to see if imported board hash matches
      for(var i = 0;i < tmpNotationArr.length;i++) { // eslint-disable-line no-redeclare
        var currTmpNotation = '';
        for(var j = 0;j <= i;j++) {
          currTmpNotation += tmpNotationArr[j] + (tmpNotationArr[j].includes('[') ? '\n' : ' ');
        }
        try {
          currTmpChess.import(currTmpNotation);
          if(currTmpChess.hash === hash) {
            return tmpNotationArr[i];
          }
        }
        catch(err) {}
      }
    }
  }
  catch(err) {
  }
  return null;
};
