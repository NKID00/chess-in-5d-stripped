const deepcopy = require('deep-copy');
const moveUtils = require('@local/engine/move/moveUtils');
const stateUtils = require('@local/engine/stateUtils');
//const moveState = require('@local/engine/move/moveState');

exports.defs = [
  {
    name: 'pawn',
    moveSpec: [],
    moveVec: [],
    moveGen: (gameState, currPosition) => {
      var res = [];
      for(var i = 0;i < gameState.timelines.length;i++) {
        for(var j = 0;j < gameState.timelines[i].turns.length;j++) {
          if(currPosition[1] === gameState.timelines[i].timeline) {
            if(currPosition[0] === gameState.timelines[i].turns[j].turn && gameState.playerAction === gameState.timelines[i].turns[j].playerTurn) {
              for(var k = 0;k < gameState.timelines[i].turns[j].pieces.length;k++) {
                var currPiece = gameState.timelines[i].turns[j].pieces[k];
                if(currPiece.position[0] === currPosition[2] && currPiece.position[1] === currPosition[3]) {
                  if(currPiece.player === 'white') {
                    if(currPiece.position[1] > 1) {
                      //Forward XY Movement
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2],
                        currPosition[3] - 1
                      ], gameState.playerAction, 'white');
                      if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2],
                        currPosition[3] - 1
                      ], gameState.playerAction)) {
                        res.push({
                          action: gameState.action,
                          player: currPiece.player,
                          pieceCapture: null,
                          sourcePosition: currPosition,
                          destinationPosition: [
                            currPosition[0],
                            currPosition[1],
                            currPosition[2],
                            currPosition[3] - 1
                          ],
                          destinationPiece: null,
                          additionalMoves: []
                        });
                      }
                      //Capture XY Movement
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] - 1,
                        currPosition[3] - 1
                      ], gameState.playerAction, 'white');
                      if(pieceBlock.capturePieceStr !== null) {
                        res.push({
                          action: gameState.action,
                          player: currPiece.player,
                          pieceCapture: {
                            piece: pieceBlock.capturePieceStr,
                            position: [currPiece.position[0]-1,currPiece.position[1]-1]
                          },
                          sourcePosition: currPosition,
                          destinationPosition: [
                            currPosition[0],
                            currPosition[1],
                            currPosition[2] - 1,
                            currPosition[3] - 1
                          ],
                          destinationPiece: null,
                          additionalMoves: []
                        });
                      }
                      //Capture XY Movement
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] + 1,
                        currPosition[3] - 1
                      ], gameState.playerAction, 'white');
                      if(pieceBlock.capturePieceStr !== null) {
                        res.push({
                          action: gameState.action,
                          player: currPiece.player,
                          pieceCapture: {
                            piece: pieceBlock.capturePieceStr,
                            position: [currPiece.position[0]+1,currPiece.position[1]-1]
                          },
                          sourcePosition: currPosition,
                          destinationPosition: [
                            currPosition[0],
                            currPosition[1],
                            currPosition[2] + 1,
                            currPosition[3] - 1
                          ],
                          destinationPiece: null,
                          additionalMoves: []
                        });
                      }
                      //En Passant XY Movement
                      if(currPiece.position[1] === 3) {
                        var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2] - 1,
                          currPosition[3]
                        ], gameState.playerAction, 'white');
                        var pieceBlock2 = moveUtils.checkPieceBlock(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2] - 1,
                          currPosition[3] - 2
                        ], gameState.playerAction, 'white');
                        if(pieceBlock.capturePieceStr === 'pawn' && pieceBlock2.capturePieceStr === null) {
                          var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                            currPosition[0] - 1,
                            currPosition[1],
                            currPosition[2] - 1,
                            currPosition[3] - 2
                          ], gameState.playerAction, 'white');
                          if(pieceBlock.capturePieceStr === 'pawn') {
                            res.push({
                              action: gameState.action,
                              player: currPiece.player,
                              pieceCapture: {
                                piece: pieceBlock.capturePieceStr,
                                position: [currPiece.position[0]-1,currPiece.position[1]]
                              },
                              sourcePosition: currPosition,
                              destinationPosition: [
                                currPosition[0],
                                currPosition[1],
                                currPosition[2] - 1,
                                currPosition[3] - 1
                              ],
                              destinationPiece: null,
                              additionalMoves: []
                            });
                          }
                        }
                        var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2] + 1,
                          currPosition[3]
                        ], gameState.playerAction, 'white');
                        var pieceBlock2 = moveUtils.checkPieceBlock(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2] + 1,
                          currPosition[3] - 2
                        ], gameState.playerAction, 'white');
                        if(pieceBlock.capturePieceStr === 'pawn' && pieceBlock2.capturePieceStr === null) {
                          var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                            currPosition[0] - 1,
                            currPosition[1],
                            currPosition[2] + 1,
                            currPosition[3] - 2
                          ], gameState.playerAction, 'white');
                          if(pieceBlock.capturePieceStr === 'pawn') {
                            res.push({
                              action: gameState.action,
                              player: currPiece.player,
                              pieceCapture: {
                                piece: pieceBlock.capturePieceStr,
                                position: [currPiece.position[0]+1,currPiece.position[1]]
                              },
                              sourcePosition: currPosition,
                              destinationPosition: [
                                currPosition[0],
                                currPosition[1],
                                currPosition[2] + 1,
                                currPosition[3] - 1
                              ],
                              destinationPiece: null,
                              additionalMoves: []
                            });
                          }
                        }
                      }
                    }
                    else if(currPiece.position[1] === 1) {
                      //Forward XY Movement with Promotion
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2],
                        currPosition[3] - 1
                      ], gameState.playerAction, 'white');
                      if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2],
                        currPosition[3] - 1
                      ], gameState.playerAction)) {
                        var base = {
                          action: gameState.action,
                          player: currPiece.player,
                          pieceCapture: null,
                          sourcePosition: currPosition,
                          destinationPosition: [
                            currPosition[0],
                            currPosition[1],
                            currPosition[2],
                            currPosition[3] - 1
                          ],
                          destinationPiece: 'bishop',
                          additionalMoves: []
                        };
                        res.push(deepcopy(base));
                        base.destinationPiece = 'knight';
                        res.push(deepcopy(base));
                        base.destinationPiece = 'rook';
                        res.push(deepcopy(base));
                        base.destinationPiece = 'queen';
                        res.push(deepcopy(base));
                      }
                      //Capture XY Movement with Promotion
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] - 1,
                        currPosition[3] - 1
                      ], gameState.playerAction, 'white');
                      if(pieceBlock.capturePieceStr !== null) {
                        var base = {
                          action: gameState.action,
                          player: currPiece.player,
                          pieceCapture: null,
                          sourcePosition: currPosition,
                          destinationPosition: [
                            currPosition[0],
                            currPosition[1],
                            currPosition[2] - 1,
                            currPosition[3] - 1
                          ],
                          destinationPiece: 'bishop',
                          additionalMoves: []
                        };
                        res.push(deepcopy(base));
                        base.destinationPiece = 'knight';
                        res.push(deepcopy(base));
                        base.destinationPiece = 'rook';
                        res.push(deepcopy(base));
                        base.destinationPiece = 'queen';
                        res.push(deepcopy(base));
                      }
                      //Capture XY Movement with Promotion
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] + 1,
                        currPosition[3] - 1
                      ], gameState.playerAction, 'white');
                      if(pieceBlock.capturePieceStr !== null) {
                        var base = {
                          action: gameState.action,
                          player: currPiece.player,
                          pieceCapture: null,
                          sourcePosition: currPosition,
                          destinationPosition: [
                            currPosition[0],
                            currPosition[1],
                            currPosition[2] + 1,
                            currPosition[3] - 1
                          ],
                          destinationPiece: 'bishop',
                          additionalMoves: []
                        };
                        res.push(deepcopy(base));
                        base.destinationPiece = 'knight';
                        res.push(deepcopy(base));
                        base.destinationPiece = 'rook';
                        res.push(deepcopy(base));
                        base.destinationPiece = 'queen';
                        res.push(deepcopy(base));
                      }
                    }
                    if(!currPiece.hasMoved) {
                      //Two Square XY Movement
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2],
                        currPosition[3] - 1
                      ], gameState.playerAction, 'white');
                      if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2],
                        currPosition[3] - 1
                      ], gameState.playerAction)) {
                        var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2],
                          currPosition[3] - 2
                        ], gameState.playerAction, 'white');
                        if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2],
                          currPosition[3] - 2
                        ], gameState.playerAction)) {
                          res.push({
                            action: gameState.action,
                            player: currPiece.player,
                            pieceCapture: null,
                            sourcePosition: currPosition,
                            destinationPosition: [
                              currPosition[0],
                              currPosition[1],
                              currPosition[2],
                              currPosition[3] - 2
                            ],
                            destinationPiece: null,
                            additionalMoves: []
                          });
                        }
                      }
                    }
                    //Forward TL Movement
                    var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                      currPosition[0],
                      currPosition[1] - 1,
                      currPosition[2],
                      currPosition[3]
                    ], gameState.playerAction, 'white');
                    if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                      currPosition[0],
                      currPosition[1] - 1,
                      currPosition[2],
                      currPosition[3]
                    ], gameState.playerAction)) {
                      res.push({
                        action: gameState.action,
                        player: currPiece.player,
                        pieceCapture: null,
                        sourcePosition: currPosition,
                        destinationPosition: [
                          currPosition[0],
                          currPosition[1] - 1,
                          currPosition[2],
                          currPosition[3]
                        ],
                        destinationPiece: null,
                        additionalMoves: []
                      });
                    }
                    //Capture TL Movement
                    var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                      currPosition[0] - 1,
                      currPosition[1] - 1,
                      currPosition[2],
                      currPosition[3]
                    ], gameState.playerAction, 'white');
                    if(pieceBlock.capturePieceStr !== null) {
                      res.push({
                        action: gameState.action,
                        player: currPiece.player,
                        pieceCapture: {
                          piece: pieceBlock.capturePieceStr,
                          position: [currPiece.position[0]-1,currPiece.position[1]-1]
                        },
                        sourcePosition: currPosition,
                        destinationPosition: [
                          currPosition[0] - 1,
                          currPosition[1] - 1,
                          currPosition[2],
                          currPosition[3]
                        ],
                        destinationPiece: null,
                        additionalMoves: []
                      });
                    }
                    //Capture TL Movement
                    var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                      currPosition[0] + 1,
                      currPosition[1] - 1,
                      currPosition[2],
                      currPosition[3]
                    ], gameState.playerAction, 'white');
                    if(pieceBlock.capturePieceStr !== null) {
                      res.push({
                        action: gameState.action,
                        player: currPiece.player,
                        pieceCapture: {
                          piece: pieceBlock.capturePieceStr,
                          position: [currPiece.position[0]+1,currPiece.position[1]-1]
                        },
                        sourcePosition: currPosition,
                        destinationPosition: [
                          currPosition[0] + 1,
                          currPosition[1] - 1,
                          currPosition[2],
                          currPosition[3]
                        ],
                        destinationPiece: null,
                        additionalMoves: []
                      });
                    }
                  }
                  if(currPiece.player === 'black') {
                    if(currPiece.position[1] < 6) {
                      //Forward XY Movement
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2],
                        currPosition[3] + 1
                      ], gameState.playerAction, 'black');
                      if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2],
                        currPosition[3] + 1
                      ], gameState.playerAction)) {
                        res.push({
                          action: gameState.action,
                          player: currPiece.player,
                          pieceCapture: null,
                          sourcePosition: currPosition,
                          destinationPosition: [
                            currPosition[0],
                            currPosition[1],
                            currPosition[2],
                            currPosition[3] + 1
                          ],
                          destinationPiece: null,
                          additionalMoves: []
                        });
                      }
                      //Capture XY Movement
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] - 1,
                        currPosition[3] + 1
                      ], gameState.playerAction, 'black');
                      if(pieceBlock.capturePieceStr !== null) {
                        res.push({
                          action: gameState.action,
                          player: currPiece.player,
                          pieceCapture: {
                            piece: pieceBlock.capturePieceStr,
                            position: [currPiece.position[0]-1,currPiece.position[1]-1]
                          },
                          sourcePosition: currPosition,
                          destinationPosition: [
                            currPosition[0],
                            currPosition[1],
                            currPosition[2] - 1,
                            currPosition[3] + 1
                          ],
                          destinationPiece: null,
                          additionalMoves: []
                        });
                      }
                      //Capture XY Movement
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] + 1,
                        currPosition[3] + 1
                      ], gameState.playerAction, 'black');
                      if(pieceBlock.capturePieceStr !== null) {
                        res.push({
                          action: gameState.action,
                          player: currPiece.player,
                          pieceCapture: {
                            piece: pieceBlock.capturePieceStr,
                            position: [currPiece.position[0]+1,currPiece.position[1]-1]
                          },
                          sourcePosition: currPosition,
                          destinationPosition: [
                            currPosition[0],
                            currPosition[1],
                            currPosition[2] + 1,
                            currPosition[3] + 1
                          ],
                          destinationPiece: null,
                          additionalMoves: []
                        });
                      }
                      //En Passant XY Movement
                      if(currPiece.position[1] === 4) {
                        var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2] - 1,
                          currPosition[3]
                        ], gameState.playerAction, 'black');
                        var pieceBlock2 = moveUtils.checkPieceBlock(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2] - 1,
                          currPosition[3] + 2
                        ], gameState.playerAction, 'black');
                        if(pieceBlock.capturePieceStr === 'pawn' && pieceBlock2.capturePieceStr === null) {
                          var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                            currPosition[0] - 1,
                            currPosition[1],
                            currPosition[2] - 1,
                            currPosition[3] + 2
                          ], gameState.playerAction, 'black');
                          if(pieceBlock.capturePieceStr === 'pawn') {
                            res.push({
                              action: gameState.action,
                              player: currPiece.player,
                              pieceCapture: {
                                piece: pieceBlock.capturePieceStr,
                                position: [currPiece.position[0]-1,currPiece.position[1]]
                              },
                              sourcePosition: currPosition,
                              destinationPosition: [
                                currPosition[0],
                                currPosition[1],
                                currPosition[2] - 1,
                                currPosition[3] + 1
                              ],
                              destinationPiece: null,
                              additionalMoves: []
                            });
                          }
                        }
                        var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2] + 1,
                          currPosition[3]
                        ], gameState.playerAction, 'black');
                        var pieceBlock2 = moveUtils.checkPieceBlock(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2] - 1,
                          currPosition[3] + 2
                        ], gameState.playerAction, 'black');
                        if(pieceBlock.capturePieceStr !== null && pieceBlock2.capturePieceStr === null) {
                          var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                            currPosition[0] - 1,
                            currPosition[1],
                            currPosition[2] + 1,
                            currPosition[3] + 2
                          ], gameState.playerAction, 'black');
                          if(pieceBlock.capturePieceStr !== null) {
                            res.push({
                              action: gameState.action,
                              player: currPiece.player,
                              pieceCapture: {
                                piece: pieceBlock.capturePieceStr,
                                position: [currPiece.position[0]+1,currPiece.position[1]]
                              },
                              sourcePosition: currPosition,
                              destinationPosition: [
                                currPosition[0],
                                currPosition[1],
                                currPosition[2] + 1,
                                currPosition[3] + 1
                              ],
                              destinationPiece: null,
                              additionalMoves: []
                            });
                          }
                        }
                      }
                    }
                    else if(currPiece.position[1] === 1) {
                      //Forward XY Movement with Promotion
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2],
                        currPosition[3] + 1
                      ], gameState.playerAction, 'black');
                      if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2],
                        currPosition[3] + 1
                      ], gameState.playerAction)) {
                        var base = {
                          action: gameState.action,
                          player: currPiece.player,
                          pieceCapture: null,
                          sourcePosition: currPosition,
                          destinationPosition: [
                            currPosition[0],
                            currPosition[1],
                            currPosition[2],
                            currPosition[3] + 1
                          ],
                          destinationPiece: 'bishop',
                          additionalMoves: []
                        };
                        res.push(deepcopy(base));
                        base.destinationPiece = 'knight';
                        res.push(deepcopy(base));
                        base.destinationPiece = 'rook';
                        res.push(deepcopy(base));
                        base.destinationPiece = 'queen';
                        res.push(deepcopy(base));
                      }
                      //Capture XY Movement with Promotion
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] - 1,
                        currPosition[3] + 1
                      ], gameState.playerAction, 'black');
                      if(pieceBlock.capturePieceStr !== null) {
                        var base = {
                          action: gameState.action,
                          player: currPiece.player,
                          pieceCapture: null,
                          sourcePosition: currPosition,
                          destinationPosition: [
                            currPosition[0],
                            currPosition[1],
                            currPosition[2] - 1,
                            currPosition[3] + 1
                          ],
                          destinationPiece: 'bishop',
                          additionalMoves: []
                        };
                        res.push(deepcopy(base));
                        base.destinationPiece = 'knight';
                        res.push(deepcopy(base));
                        base.destinationPiece = 'rook';
                        res.push(deepcopy(base));
                        base.destinationPiece = 'queen';
                        res.push(deepcopy(base));
                      }
                      //Capture XY Movement with Promotion
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] + 1,
                        currPosition[3] + 1
                      ], gameState.playerAction, 'black');
                      if(pieceBlock.capturePieceStr !== null) {
                        var base = {
                          action: gameState.action,
                          player: currPiece.player,
                          pieceCapture: null,
                          sourcePosition: currPosition,
                          destinationPosition: [
                            currPosition[0],
                            currPosition[1],
                            currPosition[2] + 1,
                            currPosition[3] + 1
                          ],
                          destinationPiece: 'bishop',
                          additionalMoves: []
                        };
                        res.push(deepcopy(base));
                        base.destinationPiece = 'knight';
                        res.push(deepcopy(base));
                        base.destinationPiece = 'rook';
                        res.push(deepcopy(base));
                        base.destinationPiece = 'queen';
                        res.push(deepcopy(base));
                      }
                    }
                    if(!currPiece.hasMoved) {
                      //Two Square XY Movement
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2],
                        currPosition[3] + 1
                      ], gameState.playerAction, 'black');
                      if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2],
                        currPosition[3] + 1
                      ], gameState.playerAction)) {
                        var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2],
                          currPosition[3] + 2
                        ], gameState.playerAction, 'black');
                        if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2],
                          currPosition[3] + 2
                        ], gameState.playerAction)) {
                          res.push({
                            action: gameState.action,
                            player: currPiece.player,
                            pieceCapture: null,
                            sourcePosition: currPosition,
                            destinationPosition: [
                              currPosition[0],
                              currPosition[1],
                              currPosition[2],
                              currPosition[3] + 2
                            ],
                            destinationPiece: null,
                            additionalMoves: []
                          });
                        }
                      }
                    }
                    //Forward TL Movement
                    var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                      currPosition[0],
                      currPosition[1] + 1,
                      currPosition[2],
                      currPosition[3]
                    ], gameState.playerAction, 'black');
                    if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                      currPosition[0],
                      currPosition[1] + 1,
                      currPosition[2],
                      currPosition[3]
                    ], gameState.playerAction)) {
                      res.push({
                        action: gameState.action,
                        player: currPiece.player,
                        pieceCapture: null,
                        sourcePosition: currPosition,
                        destinationPosition: [
                          currPosition[0],
                          currPosition[1] + 1,
                          currPosition[2],
                          currPosition[3]
                        ],
                        destinationPiece: null,
                        additionalMoves: []
                      });
                    }
                    //Capture TL Movement
                    var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                      currPosition[0] - 1,
                      currPosition[1] + 1,
                      currPosition[2],
                      currPosition[3]
                    ], gameState.playerAction, 'black');
                    if(pieceBlock.capturePieceStr !== null) {
                      res.push({
                        action: gameState.action,
                        player: currPiece.player,
                        pieceCapture: {
                          piece: pieceBlock.capturePieceStr,
                          position: [currPiece.position[0]-1,currPiece.position[1]-1]
                        },
                        sourcePosition: currPosition,
                        destinationPosition: [
                          currPosition[0] - 1,
                          currPosition[1] + 1,
                          currPosition[2],
                          currPosition[3]
                        ],
                        destinationPiece: null,
                        additionalMoves: []
                      });
                    }
                    //Capture TL Movement
                    var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                      currPosition[0] + 1,
                      currPosition[1] + 1,
                      currPosition[2],
                      currPosition[3]
                    ], gameState.playerAction, 'black');
                    if(pieceBlock.capturePieceStr !== null) {
                      res.push({
                        action: gameState.action,
                        player: currPiece.player,
                        pieceCapture: {
                          piece: pieceBlock.capturePieceStr,
                          position: [currPiece.position[0]+1,currPiece.position[1]-1]
                        },
                        sourcePosition: currPosition,
                        destinationPosition: [
                          currPosition[0] + 1,
                          currPosition[1] + 1,
                          currPosition[2],
                          currPosition[3]
                        ],
                        destinationPiece: null,
                        additionalMoves: []
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
      return res;
    }
  },
  {
    name: 'bishop',
    displayName: 'Bishop',
    moveSpec: [],
    moveVec: [
      //[Turn, Timeline, Rank, File]
      [ 0, 0, 1, 1],
      [ 0, 0, 1,-1],
      [ 0, 0,-1, 1],
      [ 0, 0,-1,-1],

      [ 0, 1, 0, 1],
      [ 0, 1, 0,-1],
      [ 0,-1, 0, 1],
      [ 0,-1, 0,-1],

      [ 1, 0, 0, 1],
      [ 1, 0, 0,-1],
      [-1, 0, 0, 1],
      [-1, 0, 0,-1],

      [ 1, 0, 1, 0],
      [ 1, 0,-1, 0],
      [-1, 0, 1, 0],
      [-1, 0,-1, 0],

      [ 1, 1, 0, 0],
      [ 1,-1, 0, 0],
      [-1, 1, 0, 0],
      [-1,-1, 0, 0]
    ],
    moveGen: (gameState, currPosition) => { return []; }
  },
  {
    name: 'knight',
    moveSpec: [ //[Turn, Timeline, Rank, File]
      [ 0, 0, 1, 2],
      [ 0, 0, 1,-2],
      [ 0, 0,-1, 2],
      [ 0, 0,-1,-2],
      [ 0, 0, 2, 1],
      [ 0, 0, 2,-1],
      [ 0, 0,-2, 1],
      [ 0, 0,-2,-1],

      [ 0, 1, 0, 2],
      [ 0, 1, 0,-2],
      [ 0,-1, 0, 2],
      [ 0,-1, 0,-2],
      [ 0, 2, 0, 1],
      [ 0, 2, 0,-1],
      [ 0,-2, 0, 1],
      [ 0,-2, 0,-1],

      [ 0, 1, 2, 0],
      [ 0, 1,-2, 0],
      [ 0,-1, 2, 0],
      [ 0,-1,-2, 0],
      [ 0, 2, 1, 0],
      [ 0, 2,-1, 0],
      [ 0,-2, 1, 0],
      [ 0,-2,-1, 0],

      [ 1, 0, 0, 2],
      [ 1, 0, 0,-2],
      [-1, 0, 0, 2],
      [-1, 0, 0,-2],
      [ 2, 0, 0, 1],
      [ 2, 0, 0,-1],
      [-2, 0, 0, 1],
      [-2, 0, 0,-1],

      [ 1, 0, 2, 0],
      [ 1, 0,-2, 0],
      [-1, 0, 2, 0],
      [-1, 0,-2, 0],
      [ 2, 0, 1, 0],
      [ 2, 0,-1, 0],
      [-2, 0, 1, 0],
      [-2, 0,-1, 0],

      [ 1, 2, 0, 0],
      [ 1,-2, 0, 0],
      [-1, 2, 0, 0],
      [-1,-2, 0, 0],
      [ 2, 1, 0, 0],
      [ 2,-1, 0, 0],
      [-2, 1, 0, 0],
      [-2,-1, 0, 0]
    ],
    moveVec: [],
    moveGen: (gameState, currPosition) => { return []; }
  },
  {
    name: 'rook',
    moveSpec: [],
    moveVec: [
      //[Turn, Timeline, Rank, File]
      [ 0, 0, 0, 1],
      [ 0, 0, 1, 0],
      [ 0, 1, 0, 0],
      [ 1, 0, 0, 0],
      [ 0, 0, 0,-1],
      [ 0, 0,-1, 0],
      [ 0,-1, 0, 0],
      [-1, 0, 0, 0]
    ],
    moveGen: (gameState, currPosition) => { return []; }
  },
  {
    name: 'queen',
    moveSpec: [],
    moveVec: [
      //[Turn, Timeline, Rank, File]
      [ 0, 0, 0, 1],
      [ 0, 0, 0,-1],

      [ 0, 0, 1, 0],
      [ 0, 0,-1, 0],

      [ 0, 0, 1, 1],
      [ 0, 0, 1,-1],
      [ 0, 0,-1, 1],
      [ 0, 0,-1,-1],

      [ 0, 1, 0, 0],
      [ 0,-1, 0, 0],

      [ 0, 1, 0, 1],
      [ 0, 1, 0,-1],
      [ 0,-1, 0, 1],
      [ 0,-1, 0,-1],

      [ 0, 1, 1, 1],
      [ 0, 1, 1,-1],
      [ 0, 1,-1, 1],
      [ 0, 1,-1,-1],
      [ 0,-1, 1, 1],
      [ 0,-1, 1,-1],
      [ 0,-1,-1, 1],
      [ 0,-1,-1,-1],

      [ 1, 0, 0, 0],
      [-1, 0, 0, 0],

      [ 1, 0, 0, 1],
      [ 1, 0, 0,-1],
      [-1, 0, 0, 1],
      [-1, 0, 0,-1],

      [ 1, 0, 1, 0],
      [ 1, 0,-1, 0],
      [-1, 0, 1, 0],
      [-1, 0,-1, 0],

      [ 1, 0, 1, 1],
      [ 1, 0, 1,-1],
      [ 1, 0,-1, 1],
      [ 1, 0,-1,-1],
      [-1, 0, 1, 1],
      [-1, 0, 1,-1],
      [-1, 0,-1, 1],
      [-1, 0,-1,-1],

      [ 1, 1, 0, 0],
      [ 1,-1, 0, 0],
      [-1, 1, 0, 0],
      [-1,-1, 0, 0],

      [ 1, 1, 0, 1],
      [ 1, 1, 0,-1],
      [ 1,-1, 0, 1],
      [ 1,-1, 0,-1],
      [-1, 1, 0, 1],
      [-1, 1, 0,-1],
      [-1,-1, 0, 1],
      [-1,-1, 0,-1],

      [ 1, 1, 1, 1],
      [ 1, 1, 1,-1],
      [ 1, 1,-1, 1],
      [ 1, 1,-1,-1],
      [ 1,-1, 1, 1],
      [ 1,-1, 1,-1],
      [ 1,-1,-1, 1],
      [ 1,-1,-1,-1],
      [-1, 1, 1, 1],
      [-1, 1, 1,-1],
      [-1, 1,-1, 1],
      [-1, 1,-1,-1],
      [-1,-1, 1, 1],
      [-1,-1, 1,-1],
      [-1,-1,-1, 1],
      [-1,-1,-1,-1]
    ],
    moveGen: (gameState, currPosition) => { return []; }
  },
  {
    name: 'king',
    moveSpec: [
      //[Turn, Timeline, Rank, File]
      [ 0, 0, 0, 1],
      [ 0, 0, 0,-1],

      [ 0, 0, 1, 0],
      [ 0, 0,-1, 0],

      [ 0, 0, 1, 1],
      [ 0, 0, 1,-1],
      [ 0, 0,-1, 1],
      [ 0, 0,-1,-1],

      [ 0, 1, 0, 0],
      [ 0,-1, 0, 0],

      [ 0, 1, 0, 1],
      [ 0, 1, 0,-1],
      [ 0,-1, 0, 1],
      [ 0,-1, 0,-1],

      [ 0, 1, 1, 1],
      [ 0, 1, 1,-1],
      [ 0, 1,-1, 1],
      [ 0, 1,-1,-1],
      [ 0,-1, 1, 1],
      [ 0,-1, 1,-1],
      [ 0,-1,-1, 1],
      [ 0,-1,-1,-1],

      [ 1, 0, 0, 0],
      [-1, 0, 0, 0],

      [ 1, 0, 0, 1],
      [ 1, 0, 0,-1],
      [-1, 0, 0, 1],
      [-1, 0, 0,-1],

      [ 1, 0, 1, 0],
      [ 1, 0,-1, 0],
      [-1, 0, 1, 0],
      [-1, 0,-1, 0],

      [ 1, 0, 1, 1],
      [ 1, 0, 1,-1],
      [ 1, 0,-1, 1],
      [ 1, 0,-1,-1],
      [-1, 0, 1, 1],
      [-1, 0, 1,-1],
      [-1, 0,-1, 1],
      [-1, 0,-1,-1],

      [ 1, 1, 0, 0],
      [ 1,-1, 0, 0],
      [-1, 1, 0, 0],
      [-1,-1, 0, 0],

      [ 1, 1, 0, 1],
      [ 1, 1, 0,-1],
      [ 1,-1, 0, 1],
      [ 1,-1, 0,-1],
      [-1, 1, 0, 1],
      [-1, 1, 0,-1],
      [-1,-1, 0, 1],
      [-1,-1, 0,-1],

      [ 1, 1, 1, 1],
      [ 1, 1, 1,-1],
      [ 1, 1,-1, 1],
      [ 1, 1,-1,-1],
      [ 1,-1, 1, 1],
      [ 1,-1, 1,-1],
      [ 1,-1,-1, 1],
      [ 1,-1,-1,-1],
      [-1, 1, 1, 1],
      [-1, 1, 1,-1],
      [-1, 1,-1, 1],
      [-1, 1,-1,-1],
      [-1,-1, 1, 1],
      [-1,-1, 1,-1],
      [-1,-1,-1, 1],
      [-1,-1,-1,-1]
    ],
    moveVec: [],
    moveGen: (gameState, currPosition) => {
      var res = [];
      for(var i = 0;i < gameState.timelines.length;i++) {
        for(var j = 0;j < gameState.timelines[i].turns.length;j++) {
          if(currPosition[1] === gameState.timelines[i].timeline) {
            if(currPosition[0] === gameState.timelines[i].turns[j].turn && gameState.playerAction === gameState.timelines[i].turns[j].playerTurn) {
              for(var k = 0;k < gameState.timelines[i].turns[j].pieces.length;k++) {
                var currPiece = gameState.timelines[i].turns[j].pieces[k];
                if(currPiece.position[0] === currPosition[2] && currPiece.position[1] === currPosition[3]) {
                  //Grab rook pieces
                  var queenRook = null;
                  var kingRook = null;
                  for(var l = 0;l < gameState.timelines[i].turns[j].pieces.length;l++) {
                    var currPiece2 = gameState.timelines[i].turns[j].pieces[l];
                    if(!currPiece2.hasMoved) {
                      if(currPiece2.type === 'rook') {
                        if(currPiece2.position[0] === 0) {
                          queenRook = currPiece2;
                        }
                        if(currPiece2.position[0] === 7) {
                          kingRook = currPiece2;
                        }
                      }
                    }
                  }
                  //Queenside Castling
                  baseMove = {
                    action: gameState.action,
                    player: currPiece.player,
                    pieceCapture: null,
                    sourcePosition: currPosition,
                    destinationPosition: [
                      currPosition[0],
                      currPosition[1],
                      currPosition[2] - 2,
                      currPosition[3]
                    ],
                    destinationPiece: null,
                    additionalMoves: [{
                      action: gameState.action,
                      player: currPiece.player,
                      pieceCapture: null,
                      sourcePosition: [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] - 4,
                        currPosition[3]
                      ],
                      destinationPosition: [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] - 1,
                        currPosition[3]
                      ],
                      destinationPiece: null,
                      additionalMoves: []
                    }]
                  };
                  if(queenRook !== null) {
                    //Check no blocking pieces
                    var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                      currPosition[0],
                      currPosition[1],
                      currPosition[2] - 1,
                      currPosition[3]
                    ], gameState.playerAction, currPiece.player);
                    if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                      currPosition[0],
                      currPosition[1],
                      currPosition[2] - 1,
                      currPosition[3]
                    ], gameState.playerAction)) {
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] - 2,
                        currPosition[3]
                      ], gameState.playerAction, currPiece.player);
                      if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] - 2,
                        currPosition[3]
                      ], gameState.playerAction)) {
                        var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2] - 3,
                          currPosition[3]
                        ], gameState.playerAction, currPiece.player);
                        if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                          currPosition[0],
                          currPosition[1],
                          currPosition[2] - 3,
                          currPosition[3]
                        ], gameState.playerAction)) {
                          //Check King is not in attack
                          var currChecks = stateUtils.stateGetChecks(gameState);
                          var inCheckHere = false;
                          for(var m = 0;m < currChecks.length;m++) {
                            if(
                              currChecks[m].destinationPosition[0] === currPosition[0] + 1 &&
                              currChecks[m].destinationPosition[1] === currPosition[1] &&
                              currChecks[m].destinationPosition[2] === currPosition[2] &&
                              currChecks[m].destinationPosition[3] === currPosition[3]
                            ) {
                              inCheckHere = true;
                            }
                          }
                          if(currChecks.length === 0 || !inCheckHere) {
                            var betweenMove = {
                              action: gameState.action,
                              player: currPiece.player,
                              pieceCapture: null,
                              sourcePosition: currPosition,
                              destinationPosition: [
                                currPosition[0],
                                currPosition[1],
                                currPosition[2] - 1,
                                currPosition[3]
                              ],
                              destinationPiece: null,
                              additionalMoves: []
                            };
                            var currChecks = stateUtils.stateGetChecks(moveState.stateModify(gameState, betweenMove));
                            var inCheckHere = false;
                            for(var m = 0;m < currChecks.length;m++) {
                              if(
                                currChecks[m].destinationPosition[0] === currPosition[0] + 1 &&
                                currChecks[m].destinationPosition[1] === currPosition[1] &&
                                currChecks[m].destinationPosition[2] === currPosition[2] &&
                                currChecks[m].destinationPosition[3] === currPosition[3]
                              ) {
                                inCheckHere = true;
                              }
                            }
                            if(currChecks.length === 0 || !inCheckHere) {
                              var currChecks = stateUtils.stateGetChecks(moveState.stateModify(gameState, baseMove));
                              var inCheckHere = false;
                              for(var m = 0;m < currChecks.length;m++) {
                                if(
                                  currChecks[m].destinationPosition[0] === currPosition[0] + 1 &&
                                  currChecks[m].destinationPosition[1] === currPosition[1] &&
                                  currChecks[m].destinationPosition[2] === currPosition[2] &&
                                  currChecks[m].destinationPosition[3] === currPosition[3]
                                ) {
                                  inCheckHere = true;
                                }
                              }
                              if(currChecks.length === 0 || !inCheckHere) {
                                res.push(baseMove);
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  //Kingside Castling
                  baseMove = {
                    action: gameState.action,
                    player: currPiece.player,
                    pieceCapture: null,
                    sourcePosition: currPosition,
                    destinationPosition: [
                      currPosition[0],
                      currPosition[1],
                      currPosition[2] + 2,
                      currPosition[3]
                    ],
                    destinationPiece: null,
                    additionalMoves: [{
                      action: gameState.action,
                      player: currPiece.player,
                      pieceCapture: null,
                      sourcePosition: [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] + 3,
                        currPosition[3]
                      ],
                      destinationPosition: [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] + 1,
                        currPosition[3]
                      ],
                      destinationPiece: null,
                      additionalMoves: []
                    }]
                  };
                  if(kingRook !== null) {
                    //Check no blocking pieces
                    var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                      currPosition[0],
                      currPosition[1],
                      currPosition[2] + 1,
                      currPosition[3]
                    ], gameState.playerAction, currPiece.player);
                    if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                      currPosition[0],
                      currPosition[1],
                      currPosition[2] + 1,
                      currPosition[3]
                    ], gameState.playerAction)) {
                      var pieceBlock = moveUtils.checkPieceBlock(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] + 2,
                        currPosition[3]
                      ], gameState.playerAction, currPiece.player);
                      if(!pieceBlock.isBlocking && moveUtils.checkPositionExists(gameState, [
                        currPosition[0],
                        currPosition[1],
                        currPosition[2] + 2,
                        currPosition[3]
                      ], gameState.playerAction)) {
                        //Check King is not in attack
                        var currChecks = stateUtils.stateGetChecks(gameState);
                        var inCheckHere = false;
                        for(var m = 0;m < currChecks.length;m++) {
                          if(
                            currChecks[m].destinationPosition[0] === currPosition[0] + 1 &&
                            currChecks[m].destinationPosition[1] === currPosition[1] &&
                            currChecks[m].destinationPosition[2] === currPosition[2] &&
                            currChecks[m].destinationPosition[3] === currPosition[3]
                          ) {
                            inCheckHere = true;
                          }
                        }
                        if(currChecks.length === 0 || !inCheckHere) {
                          var betweenMove = {
                            action: gameState.action,
                            player: currPiece.player,
                            pieceCapture: null,
                            sourcePosition: currPosition,
                            destinationPosition: [
                              currPosition[0],
                              currPosition[1],
                              currPosition[2] + 1,
                              currPosition[3]
                            ],
                            destinationPiece: null,
                            additionalMoves: []
                          };
                          var currChecks = stateUtils.stateGetChecks(moveState.stateModify(gameState, betweenMove));
                          var inCheckHere = false;
                          for(var m = 0;m < currChecks.length;m++) {
                            if(
                              currChecks[m].destinationPosition[0] === currPosition[0] + 1 &&
                              currChecks[m].destinationPosition[1] === currPosition[1] &&
                              currChecks[m].destinationPosition[2] === currPosition[2] &&
                              currChecks[m].destinationPosition[3] === currPosition[3]
                            ) {
                              inCheckHere = true;
                            }
                          }
                          if(currChecks.length === 0 || !inCheckHere) {
                            var currChecks = stateUtils.stateGetChecks(moveState.stateModify(gameState, baseMove));
                            var inCheckHere = false;
                            for(var m = 0;m < currChecks.length;m++) {
                              if(
                                currChecks[m].destinationPosition[0] === currPosition[0] + 1 &&
                                currChecks[m].destinationPosition[1] === currPosition[1] &&
                                currChecks[m].destinationPosition[2] === currPosition[2] &&
                                currChecks[m].destinationPosition[3] === currPosition[3]
                              ) {
                                inCheckHere = true;
                              }
                            }
                            if(currChecks.length === 0 || !inCheckHere) {
                              res.push(baseMove);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      return res;
    }
  }
];
