import path from 'path';
import { BrowserWindow, app } from 'electron';
import Store from 'electron-store';

Store.initRenderer();

import * as ModulesManager from './modules-manager';

let window: Electron.BrowserWindow;
__dirname = app.getAppPath();

app.on('ready', () => {
  window = new BrowserWindow({
    icon:
      process.platform === 'win32'
        ? path.join(__dirname, 'icons', 'icon.ico')
        : path.join(__dirname, 'icons', 'png', '128x128.png'),
    title: 'Rhyme',
    minWidth: 800,
    minHeight: 400,
    // width: bounds.width,
    // height: bounds.height,
    // x: bounds.x,
    // y: bounds.y,
    webPreferences: {
      webSecurity: true,
      contextIsolation: false,
      nodeIntegration: true,
      autoplayPolicy: 'no-user-gesture-required',
    },
  });

  window.loadURL(`file://${path.join(__dirname, 'dist', 'renderer', 'index.html')}`);
  window.setMenu(null);

  ModulesManager.init().catch((error: Error) => {
    if (error) throw error;
  });
});
