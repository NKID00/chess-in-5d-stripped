const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const fs = require('fs');
const isDev = require('electron-is-dev');
const path = require('path');
const { compressLink } = require('../src/components/LinkCompression');

if(!isDev) {
  autoUpdater.checkForUpdatesAndNotify();
}

var mainWindow = null;
var baseUrl = isDev ? 'http://localhost:3000/' : `file://${path.join(__dirname, '../build/index.html')}`;
var mainUrl = baseUrl + '';

app.on('open-file', (e, p) => {
  if(p.includes('.5dpgn')) {
    var data = fs.readFileSync(p, 'utf8');
    mainUrl = compressLink(data);
    if(mainWindow !== null) {
      mainWindow.loadURL(mainUrl);
    }
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    show: false
  });

  if(process.argv.length > 1 && process.argv[1].includes('.5dpgn')) {
    var data = fs.readFileSync(process.argv[1], 'utf8');
    mainUrl = compressLink(data);
  }

  mainWindow.loadURL(mainUrl);
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
