const { BrowserWindow, Menu, Notification, Tray, app, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const htmlFile = path.join(__dirname, "public", "index.html");

if (isDev) {
  require("electron-reload")(path.join(__dirname, "public"), {
    electron: require(`${__dirname}/node_modules/electron`),
  });
}

let win;
let tray;

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
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
        enableRemoteModule: true,
        autoplayPolicy: "no-user-gesture-required",
      },
    });

    ipcMain.on("notification", (_event, body) => {
      new Notification({ title: "Rhyme", body }).show();
    });

    tray = new Tray(path.join(__dirname, "icon" + (process.platform === "win32" ? ".ico" : ".png")));
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Previous",
        click() {
          win.webContents.send("previous");
        },
      },
      {
        label: "Play\\Pause",
        click() {
          win.webContents.send("play/pause");
        },
      },
      {
        label: "Next",
        click() {
          win.webContents.send("next");
        },
      },
      {
        label: "Show",
        click() {
          win.show();
        },
      },
      {
        label: "Hide",
        click() {
          win.hide();
        },
      },
      {
        label: "Quit",
        click() {
          app.isQuiting = true;
          app.quit();
        },
      },
    ]);
    tray.setContextMenu(contextMenu);

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

    const storage = require("electron-json-storage");
    storage.has("settings", (err, hasKey) => {
      if (err) throw err;
      if (!hasKey) {
        let settings = {
          musicPath: app.getPath("music"),
          useDarkTheme: true,
          heyRhymeActivate: false,
          showNotifications: true,
        };

        storage.set("settings", settings, (err) => {
          if (err) throw err;
        });
      }
    });

    win.on("close", function (event) {
      if (!app.isQuiting) {
        event.preventDefault();
        win.hide();
      }

      return false;
    });
  });
  app.on("second-instance", (_event, _commandLine, _workingDirectory) => {
    // Unhide window
    win.show();
  });
}
