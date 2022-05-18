import { encode, decode } from 'url-safe-base64';

const LZUTF8 = require('lzutf8');

var cache = {};

export const compressLink = (str) => {
  if(typeof cache[str] === 'undefined') {
    let base64 = LZUTF8.compress(str, { outputEncoding: 'Base64' });
    cache[str] = encode(base64);
  }
  return cache[str];
}

export const decompressLink = (str) => {
  if(typeof cache[str] === 'undefined') {
    let base64 = decode(str);
    cache[str] = LZUTF8.decompress(base64, { inputEncoding: 'Base64', outputEncoding: 'String' });
  }
  return cache[str];
}