import { app, ipcMain } from "electron";
import channels from "../../share/channels";

import ModuleWindow from "./module-window";

class SingleInstanceModule extends ModuleWindow {
  async load() {
    const gotTheLock = app.requestSingleInstanceLock();

    if (!gotTheLock) {
      this.window.webContents.send(channels.QUIT_APP);
      console.error("Rhyme is already running");
      process.exit(0);
    }

    app.on("second-instance", () => {
      this.window.webContents.send(channels.SHOW_WINDOW);
    });
  }
}

export default SingleInstanceModule;
