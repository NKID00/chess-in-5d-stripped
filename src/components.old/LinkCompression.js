const LZUTF8 = require('lzutf8');

var cache = {};

export const compressLink = (str) => {
  if(typeof cache[str] === 'undefined') {
    cache[str] = LZUTF8.compress(str, { outputEncoding: 'Base64' });
  }
  return window.location.origin + '/#/local/game/analyze?import=' + cache[str];
}

export const decompressLink = (url) => {
  var str = url.substring((window.location.origin + '/#/local/game/analyze?import=').length);
  if(str.length <= 0) {
    return '';
  }
  if(typeof cache[str] === 'undefined') {
    cache[str] = LZUTF8.decompress(str, { inputEncoding: 'Base64', outputEncoding: 'String'});
  }
  return cache[str];
}