import {
  BrowserWindow,
  Notification as ElectronNotification,
  app,
  ipcMain,
  dialog,
} from "electron";
import path from "path";
import Store from "electron-store";
const store = new Store();

Store.initRenderer();
__dirname = app.getAppPath();

import * as ModulesManager from "./modules-manager";
import GlobalShortcutsModule from "./modules/global-shortcuts";
import StorageManagerModule from "./modules/managers/storage-manager";
import TrayModule from "./modules/tray";
import WindowManagerModule from "./modules/managers/window-manager";
import IpcManagerModule from "./modules/managers/ipc-manager";
import SingleInstanceModule from "./modules/single-instance-module";

let win: Electron.BrowserWindow;

app.on("ready", () => {
  win = new BrowserWindow({
    icon: path.join(__dirname, "build", "linux", "icons", "128x128.png"),
    title: "Rhyme",
    minWidth: 800,
    minHeight: 400,
    webPreferences: {
      webSecurity: true,
      contextIsolation: false,
      nodeIntegration: true,
      autoplayPolicy: "no-user-gesture-required",
    },
  });

  ipcMain.on("notification", (_event, body) => {
    new ElectronNotification({ title: "Rhyme", body }).show();
  });

  ipcMain.handle("show-dialog", async (_event, config) => {
    let data = await dialog.showOpenDialog(win, {
      properties: [config.dialogType],
      title: config.title,
      defaultPath: config.defaultPath,
    });

    return data.filePaths[0];
  });

  ModulesManager.init(
    new IpcManagerModule(__dirname, win),
    new GlobalShortcutsModule(__dirname, win),
    new StorageManagerModule(__dirname),
    new WindowManagerModule(__dirname, win),
    new SingleInstanceModule(__dirname, win),
    new TrayModule(__dirname, win)
  ).catch((error: Error) => {
    if (error) throw error;
  });
});
