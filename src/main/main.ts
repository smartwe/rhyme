import path from 'path';
import { BrowserWindow, Notification as ElectronNotification, app, ipcMain, dialog, screen } from 'electron';

import Store from 'electron-store';

Store.initRenderer();

import * as ModulesManager from './modules-manager';
import GlobalShortcutsModule from './modules/global-shortcuts';
import StorageManagerModule from './modules/managers/storage-manager';
import TrayModule from './modules/tray';
import WindowManagerModule from './modules/managers/window-manager';
import IpcManagerModule from './modules/managers/ipc-manager';
import SingleInstanceModule from './modules/single-instance-module';

let window: Electron.BrowserWindow;
const store = new Store();
__dirname = app.getAppPath();

app.on('ready', () => {
  const currentDisplayBounds = screen.getPrimaryDisplay().bounds;
  const bounds: { width: number; x: number; y: number; height: number } = (store.get('window-bounds') as {
    width: number;
    x: number;
    y: number;
    height: number;
  }) ?? {
    width: currentDisplayBounds.width / 2 > 800 ? currentDisplayBounds.width / 2 : 800, // 800 is the minimum width of the window
    x: currentDisplayBounds.x,
    y: currentDisplayBounds.y,
    height: currentDisplayBounds.height / 2 > 400 ? currentDisplayBounds.height / 2 : 400, // 400 is the minimum width of the window
  };

  window = new BrowserWindow({
    icon:
      process.platform === 'win32'
        ? path.join(__dirname, 'icons', 'icon.ico')
        : path.join(__dirname, 'icons', 'png', '128x128.png'),
    title: 'Rhyme',
    minWidth: 800,
    minHeight: 400,
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    webPreferences: {
      webSecurity: true,
      contextIsolation: false,
      nodeIntegration: true,
      autoplayPolicy: 'no-user-gesture-required',
    },
  });

  ipcMain.on('notification', (_event, body) => {
    new ElectronNotification({ title: 'Rhyme', body }).show();
  });

  ipcMain.handle('show-dialog', async (_event, config) => {
    const data = await dialog.showOpenDialog(window, {
      properties: [config.dialogType],
      title: config.title,
      defaultPath: config.defaultPath,
    });

    return data.filePaths[0];
  });

  ModulesManager.init(
    new WindowManagerModule(__dirname, window),
    new IpcManagerModule(__dirname, window),
    new GlobalShortcutsModule(__dirname, window),
    new StorageManagerModule(__dirname),
    new SingleInstanceModule(__dirname, window),
    new TrayModule(__dirname, window)
  ).catch((error: Error) => {
    if (error) throw error;
  });
});
