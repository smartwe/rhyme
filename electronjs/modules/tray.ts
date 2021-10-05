import { Tray, Menu } from "electron";
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
          console.log("YS");
        },
      },
      {
        label: "Play Or Pause",
        click() {
          window.webContents.send(channels.PLAY_OR_PAUSE);
          console.log("YS");
        },
      },
      {
        label: "Next",
        click() {
          window.webContents.send(channels.NEXT);
          console.log("YS");
        },
      },
      {
        label: "Show",
        click() {
          window.webContents.send(channels.SHOW_WINDOW);
          console.log("YS");
        },
      },
      {
        label: "Hide",
        click() {
          window.webContents.send(channels.HIDE_WINDOW);
          console.log("YS");
        },
      },
      {
        label: "Quit",
        click() {
          window.webContents.send(channels.QUIT_APP);
          console.log("YS");
        },
      },
    ];
    tray.setContextMenu(Menu.buildFromTemplate(items));
  }
}

export default TrayModule;
