const Store = require("electron-store");
const store = new Store();

import ModuleWindow from "./module-window";

class StorageManagerModule extends ModuleWindow {
  app: Electron.App;

  constructor(dirname: string, win: Electron.BrowserWindow, app: Electron.App) {
    super(dirname, win);
    this.app = app;
  }

  async load() {
    this.setDataToStore("settings", {
      musicPath: this.app.getPath("music"),
      heyRhymeActivate: false,
      showNotifications: true,
      minimizeToTray: false,
    });
    this.setDataToStore("theme-manager", {
      currentTheme: "default-dark",
      installedThemes: [
        {
          id: "default-dark",
          name: "Default dark",
          author: "Rhyme Designers",
          accentColor: "#ea3548",
          sidebarActiveColor: "#fff",
          panelsColor: "#121212",
          textColor: "#bbbbbb",
          titleColor: "#fff",
          backgroundColor: "#000",
        },
        {
          id: "default-light",
          name: "Default light",
          author: "Rhyme Designers",
          accentColor: "#ea3548",
          sidebarActiveColor: "#fff",
          panelsColor: "#e0e0e0",
          textColor: "#5c5c5c",
          titleColor: "#000",
          backgroundColor: "#fff",
        },
      ],
    });
  }

  setDataToStore(id: string, data: object) {
    if (store.has(id)) return;
    store.set(id, data);
  }
}

export default StorageManagerModule;
