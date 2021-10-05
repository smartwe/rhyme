import { app, ipcMain } from "electron";
import channels from "../../../share/channels";

import ModuleWindow from "../module-window";

class IpcManagerModule extends ModuleWindow {
  quitApp = false;
  async load() {
    this.window.on("close", (event) => {
      if (this.quitApp) return;
      event.preventDefault();
      this.window.hide();
    });

    ipcMain.on(channels.HIDE_WINDOW, () => {
      this.window.hide();
    });

    ipcMain.on(channels.QUIT_APP, () => {
      this.quitApp = true;
      app.quit();
    });

    ipcMain.on(channels.SHOW_WINDOW, () => {
      this.window.show();
    });
  }
}

export default IpcManagerModule;
