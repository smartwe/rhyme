import { Tray, Menu, app } from "electron";
import path from "path";
import channels from "../../share/channels";

import ModuleWindow from "./module-window";

class TrayModule extends ModuleWindow {
  async load() {
    const trayIcons = {
      icon: path.join(this.dirname, "build", "linux", "icons", "32x32.png"),
      winIcon: path.join(this.dirname, "build", "icons", "icon.ico"),
    };
    const tray = new Tray(
      process.platform === "win32" ? ".ico" : trayIcons.icon
    );
    const window = this.window;
    let items = [
      {
        label: "Previous",
        click() {
          window.webContents.send(channels.PREVIOUS);
        },
      },
      {
        label: "Play Or Pause",
        click() {
          window.webContents.send(channels.PLAY_OR_PAUSE);
        },
      },
      {
        label: "Next",
        click() {
          window.webContents.send(channels.NEXT);
        },
      },
      {
        label: "Show",
        click() {
          window.show();
        },
      },
      {
        label: "Hide",
        click() {
          window.hide();
        },
      },
      {
        label: "Quit",
        click() {
          app.quit();
        },
      },
    ];
    tray.setContextMenu(Menu.buildFromTemplate(items));
  }
}

export default TrayModule;
