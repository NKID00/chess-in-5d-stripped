const deepmerge = require('deepmerge');
const store = require('store');

const defaultTheme = {
  background: {
    paper: '#424242',
    default: '#303030',
  },
  palette: {
    type: 'dark',
    primary: {
      light: '#35baf6',
      main: '#03a9f4',
      dark: '#0276aa',
      contrastText: '#ffffff',
    },
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

export const set = (theme, emitter = null) => {
  store.set('theme', deepmerge(store.get('theme'), theme));
  if(emitter !== null) {
    emitter.emit('themeUpdate');
  }
}

export const get = () => {
  var storedTheme = store.get('theme');
  if(typeof storedTheme === 'object') {
    return deepmerge(defaultTheme, storedTheme);
  }
  return defaultTheme;
}