const Store = require("electron-store");
const store = new Store();

import Module from "../module";
import { app } from "electron";

class StorageManagerModule extends Module {
  constructor(dirname: string) {
    super(dirname);
  }

  async load() {
    this.setDataToStore("settings", {
      musicPath: app.getPath("music"),
      heyRhymeActivate: false,
      showNotifications: true,
      minimizeToTray: false,
    });
    this.setDataToStore("window-bounds", {
      x: 0,
      y: 0,
      width: 900,
      height: 600,
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
