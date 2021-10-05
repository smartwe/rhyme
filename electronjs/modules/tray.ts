import { Tray, Menu } from "electron";
import path from "path";
import channels from "../../share/channels";

import ModuleWindow from "./module-window";

class TrayModule extends ModuleWindow {
  async load() {
    const tray = new Tray(
      path.join(
        this.dirname,
        "icon" + (process.platform === "win32" ? ".ico" : ".png")
      )
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
