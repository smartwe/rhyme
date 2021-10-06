import Store from "electron-store";
const store = new Store();
import path from "path";
import { app, Menu } from "electron";

import ModuleWindow from "../module-window";

const isDev = !app.isPackaged;

class WindowManagerModule extends ModuleWindow {
  constructor(dirname: string, window: Electron.BrowserWindow) {
    super(dirname, window);
  }

  async load() {
    this.window.loadFile(path.join(this.dirname, "public", "index.html"));
    this.window.setMenu(null);
    let bounds: { width: number; x: number; y: number; height: number } =
      store.get("window-bounds") as {
        width: number;
        x: number;
        y: number;
        height: number;
      };
    this.window.setBounds(bounds);

    if (isDev) {
      const self = this;
      this.window.setMenu(
        Menu.buildFromTemplate([
          {
            label: "Dev Tools",
            click() {
              self.window.webContents.toggleDevTools();
            },
          },
        ])
      );
    }

    this.window.on("close", () => {
      store.set("window-bounds", this.window.getBounds());
    });
  }
}

export default WindowManagerModule;
