import * as authStore from 'state/auth';
import * as users from 'network/users';

export const getInfo = async (session) => {
  let isServer = typeof session.host !== 'undefined';
  let canPlay = false;
  let whitePlayerName = '';
  let whitePlayerType = 'blank'; //'human', 'bot', or 'blank'
  let whiteUsername = '';
  let blackPlayerName = '';
  let blackPlayerType = 'blank'; //'human', 'bot', or 'blank'
  let blackUsername = '';
  //Define a function that grabs information from user object returned by 5d-chess-server
  const processUser = (user, player = 'white') => {
    if(player === 'white') {
      if(user.fullname.length > 0) {
        whitePlayerName = user.fullname;
      }
      else {
        whitePlayerName = user.username;
      }
      whitePlayerType = user.bot ? 'bot' : 'human';
      whiteUsername = user.username;
    }
    else if(player === 'black') {
      if(user.fullname.length > 0) {
        blackPlayerName = user.fullname;
      }
      else {
        blackPlayerName = user.username;
      }
      blackPlayerType = user.bot ? 'bot' : 'human';
      blackUsername = user.username;
    }
    if(typeof player === 'string') {
      if(authStore.isLoggedIn()) {
        let selfUsername = authStore.get().username;
        if(selfUsername === user.username) {
          canPlay = true;
        }
      }
    }
  };
  if(isServer) {
    //Extract user info from 5d-chess-server
    if(typeof session.white === 'string' && typeof session.black === 'string') {
      whitePlayerName = session.white;
      whiteUsername = session.white;
      blackPlayerName = session.black;
      blackUsername = session.black;
      let usersData = (await users.get({ username: { $in: [session.white, session.black] } }));
      for(let user of usersData) {
        processUser(
          user,
          user.username === session.white ?
            'white'
          : user.username === session.black ?
            'black'
          :
            null
        );
      }
    }
    else if(typeof session.white === 'string' && typeof session.black !== 'string') {
      whitePlayerName = session.white;
      whiteUsername = session.white;
      let user = (await users.getOne(session.white));
      processUser(user, 'white');
    }
    else if(typeof session.white !== 'string' && typeof session.black === 'string') {
      blackPlayerName = session.black;
      blackUsername = session.black;
      let user = (await users.getOne(session.black));
      processUser(user, 'black');
    }
  }
  else {
    if(session.white.length > 0 || session.black.length > 0) {
      let selfUsername = authStore.get().username;
      if(selfUsername.length <= 0) {
        selfUsername = 'Human';
      }
      else {
        let user = (await users.getOne(selfUsername));
        if(session.white.length > 0) {
          processUser(user, 'black');
        }
        if(session.black.length > 0) {
          processUser(user, 'white');
        }
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
  }
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