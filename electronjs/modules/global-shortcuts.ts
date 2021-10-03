import { globalShortcut } from "electron";

import ModuleWindow from "./module-window";

class GlobalShortcutsModule extends ModuleWindow {
  async load() {
    globalShortcut.register("MediaPlayPause", () => {
      this.window.webContents.send("play/pause");
    });

    globalShortcut.register("MediaPreviousTrack", () => {
      this.window.webContents.send("previous");
    });

    globalShortcut.register("MediaNextTrack", () => {
      this.window.webContents.send("next");
    });
  }
}

export default GlobalShortcutsModule;
