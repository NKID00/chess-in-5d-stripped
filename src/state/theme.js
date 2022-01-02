const deepmerge = require('deepmerge');
const store = require('store');

const defaultTheme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    }
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#0085c3'
    },
    secondary: {
      main: '#f50057'
    },
    error: {
      main: '#f44336'
    },
    warning: {
      main: '#ff9800'
    },
    info: {
      main: '#2196f3'
    },
    success: {
      main: '#4caf50'
    },
    background: {
      paper: '#424242',
      default: '#303030'
    },
  },
  typography: {
    fontFamily: 'vollkorn',
    fontSize: 14
  },
  spacing: 8,
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
  extra: {
    clock: {
      fontFamily: 'roboto mono',
      fontSize: 16
    },
    notation: {
      fontFamily: 'roboto mono',
      fontSize: 12,
      highlight: {
        size: 3,
        color: '#b194e1',
      },
      newPresentToken: {
        backgroundColor: '#56b056',
        color: '#ffffff',
      },
      newTimelineToken: {
        backgroundColor: '#1f8ed5',
        color: '#ffffff',
      }
    }
  }
};

export const set = (theme, emitter = null) => {
  store.set('theme', deepmerge(store.get('theme'), theme));
  if(emitter !== null) {
    emitter.emit('themeUpdate');
  }
}

export const get = () => {
  var storedTheme = store.get('theme');
  if(typeof storedTheme === 'object' && storedTheme !== null) {
    return deepmerge(defaultTheme, storedTheme);
  }
  return defaultTheme;
}

export const reset = (emitter = null) => {
  store.remove('theme');
  if(emitter !== null) {
    emitter.emit('themeUpdate');
  }
}