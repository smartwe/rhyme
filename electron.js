const { BrowserWindow, Menu, app } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const htmlFile = path.join(__dirname, "public", "index.html");

if (isDev) {
  require("electron-reload")(path.join(__dirname, "public"), {
    electron: require(`${__dirname}/node_modules/electron`),
  });
}

app.on("ready", () => {
  let win = new BrowserWindow({
    icon: path.join(__dirname, "icon.png"),
    title: "Rhyme",
    width: 900,
    height: 600,
    webPreferences: {
      webSecurity: true,
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
    },
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
  }
});
