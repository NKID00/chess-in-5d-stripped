const deepmerge = require('deepmerge');
const store = require('store');

const defaultTheme = {
  background: {
    paper: '#424242',
    default: '#303030',
  },
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: 'vollkorn'
  },
  overrides: {
    MuiPaper: {
      outlined: {
        backgroundColor: '#303030'
      }
    },
    MuiToolbar: {
      root: {
        backgroundColor: '#212121'
      }
    }
  },
};

exports.set = (theme, emitter = null) => {
  store.set('theme', theme);
  if(emitter !== null) {
    emitter.emit('themeUpdate');
  }
}

exports.get = () => {
  var storedTheme = store.get('theme');
  if(typeof storedTheme === 'object') {
    return deepmerge(defaultTheme, storedTheme);
  }
  return defaultTheme;
}