import { Tray, Menu } from "electron";
import path from "path";

import ModuleWindow from "./module-window";

class TrayModule extends ModuleWindow {
  async load() {
    const tray = new Tray(
      path.join(
        this.dirname,
        "icon" + (process.platform === "win32" ? ".ico" : ".png")
      )
    );
    console.log(this.dirname);

    const contextMenu = Menu.buildFromTemplate(this.getTrayItems());
    tray.setToolTip("Rhyme");
    tray.setContextMenu(contextMenu);
  }

  getTrayItems(): object[] {
    const self = this;
    return [
      {
        label: "Previous",
        click() {
          self.window.webContents.send("previous");
        },
      },
      {
        label: "PlayOrPause",
        click() {
          self.window.webContents.send("play/pause");
        },
      },
      {
        label: "Next",
        click() {
          self.window.webContents.send("next");
        },
      },
      {
        label: "Show",
        click() {
          self.window.show();
        },
      },
      {
        label: "Hide",
        click() {
          self.window.hide();
        },
      },
      {
        label: "Quit",
        click() {},
      },
    ];
  }
}

export default TrayModule;
