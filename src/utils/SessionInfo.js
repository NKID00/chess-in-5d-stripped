import * as authStore from 'state/auth';

export const getInfo = async (session) => {
  let isServer = typeof session.host !== 'undefined';
  let canPlay = false;
  let whitePlayerName = '';
  let whitePlayerType = 'blank'; //'human', 'bot', or 'blank'
  let whiteUsername = '';
  let blackPlayerName = '';
  let blackPlayerType = 'blank'; //'human', 'bot', or 'blank'
  let blackUsername = '';
  if(session.white.length > 0 || session.black.length > 0) {
    let selfUsername = authStore.get().username;
    if(selfUsername.length <= 0) {
      selfUsername = 'Human';
    }
    whitePlayerName = session.white.length > 0 ? session.white : selfUsername;
    whitePlayerType = session.white.length > 0 ? 'bot' : 'human';
    whiteUsername = session.white;
    blackPlayerName = session.black.length > 0 ? session.black : selfUsername;
    blackPlayerType = session.white.length > 0 ? 'bot' : 'human';
    blackUsername = session.black;
  }
  else {
    whitePlayerName = 'White';
    whitePlayerType = 'human';
    whiteUsername = '';
    blackPlayerName = 'Black';
    blackPlayerType = 'human';
    blackUsername = '';
  }
  canPlay = !session.ended;
  return {
    isServer: isServer,
    whitePlayerName: whitePlayerName,
    whitePlayerType: whitePlayerType,
    whiteUsername: whiteUsername,
    blackPlayerName: blackPlayerName,
    blackPlayerType: blackPlayerType,
    blackUsername: blackUsername,
    canPlay: canPlay,
  };
}