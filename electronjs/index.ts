import {
  BrowserWindow,
  Menu,
  Notification as ElectronNotification,
  app,
  ipcMain,
  dialog,
} from "electron";
import path from "path";
import Store from "electron-store";

Store.initRenderer();
__dirname = app.getAppPath();

import * as ModulesManager from "./modules-manager";
import GlobalShortcutsModule from "./modules/global-shortcuts";
import StorageManagerModule from "./modules/storage-manager";
import TrayModule from "./modules/tray";
const isDev = !app.isPackaged;
const htmlFile = path.join(__dirname, "public", "index.html");

if (isDev) {
  require("electron-reload")(path.join(__dirname, "public"));
}

let win: Electron.BrowserWindow;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
  console.error("Rhyme is already running");
  process.exit(0);
}
app.on("ready", () => {
  win = new BrowserWindow({
    icon: path.join(__dirname, "icon.png"),
    title: "Rhyme",
    width: 900,
    height: 600,
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

  ipcMain.handle("show-dialog", async (event, config) => {
    let data = await dialog.showOpenDialog(win, {
      properties: [config.dialogType],
      title: config.title,
      defaultPath: config.defaultPath,
    });

    return data.filePaths[0];
  });

  win.loadFile(htmlFile);
  if (isDev) {
    win.setMenu(
      Menu.buildFromTemplate([
        {
          label: "Toggle Dev Tools",
          click() {
            win.webContents.toggleDevTools();
          },
        },
        {
          label: "Force Reload",
          click() {
            win.loadFile(htmlFile);
          },
        },
      ])
    );
  } else {
    win.setMenu(null);
  }

  ModulesManager.init(
    new GlobalShortcutsModule(__dirname, win),
    new TrayModule(__dirname, win),
    new StorageManagerModule(__dirname)
  ).catch((error: Error) => {
    if (error) throw error;
  });
});
app.on("second-instance", (_event, _commandLine, _workingDirectory) => {
  // Un-hide window
  win.show();
});
