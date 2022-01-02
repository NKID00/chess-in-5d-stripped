const LZUTF8 = require('lzutf8');

var cache = {};

export const compressLink = (str) => {
  if(typeof cache[str] === 'undefined') {
    cache[str] = LZUTF8.compress(str, { outputEncoding: 'Base64' });
  }
  return cache[str];
}

export const decompressLink = (str) => {
  if(typeof cache[str] === 'undefined') {
    cache[str] = LZUTF8.decompress(str, { inputEncoding: 'Base64', outputEncoding: 'String' });
  }
  return cache[str];
}