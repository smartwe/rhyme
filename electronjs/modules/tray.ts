/**
 * Module in charge of the Tray
 */

import os from "os";
import path from "path";
import ps from "ps-node";
import { Tray, Menu, app, ipcMain, nativeImage } from "electron";
import channels from "../../share/channels";
import ModuleWindow from "./module-window";

class TrayModule extends ModuleWindow {
  protected tray: Electron.Tray | null;
  protected trayIcon: Electron.NativeImage;
  protected songDetails: Electron.MenuItemConstructorOptions[];
  protected menu: Electron.MenuItemConstructorOptions[];

  constructor(dirname: string, window: Electron.BrowserWindow) {
    super(dirname, window);

    this.platforms = ["linux", "win32"];

    this.tray = null;

    this.songDetails = [];
    this.menu = [];

    const logosPath = path.join(path.join(this.dirname, "build"));

    const trayIcons = {
      tray: nativeImage
        .createFromPath(path.join(logosPath, "linux", "icons", "32x32.png"))
        .resize({ width: 24, height: 24 }),
      "tray-win32": nativeImage.createFromPath(
        path.join(logosPath, "icons", "icon.ico")
      ),
    };

    this.trayIcon = trayIcons.tray;

    if (os.platform() === "win32") this.trayIcon = trayIcons["tray-win32"];
    ipcMain.on("song-changed", (_event, song) => {
      this.songDetails = song;
      this.setContextMenu();
    });
  }

  async load(): Promise<void> {
    // Fix for gnome-shell and high-dpi
    if (os.platform() === "linux") {
      ps.lookup(
        {
          command: "gnome-shell",
        },
        (err: Error, _processes: Record<string, any>) => {
          if (err) {
            console.warn(err);
          } else {
            const logosPath = path.join(path.join(this.dirname, "build"));
            this.trayIcon = nativeImage
              .createFromPath(
                path.join(logosPath, "linux", "icons", "32x32.png")
              )
              .resize({ width: 24, height: 24 });

            this.refreshTrayIcon();
          }
        }
      );
    }

    this.tray = null;

    this.songDetails = [
      {
        label: "Not playing",
        enabled: false,
      },
      {
        type: "separator",
      },
    ];

    this.menu = [
      {
        label: "Play Or Pause",
        click: () => {
          this.window.webContents.send(channels.PLAY_OR_PAUSE);
        },
      },
      {
        label: "Previous",
        click: () => {
          this.window.webContents.send(channels.PREVIOUS);
        },
      },
      {
        label: "Next",
        click: () => {
          this.window.webContents.send(channels.NEXT);
        },
      },
      {
        type: "separator",
      },
      {
        label: "Show",
        click: () => {
          this.window.show();
          this.window.focus();
        },
      },
      {
        label: "Hide",
        click: () => {
          this.window.hide();
        },
      },
      {
        type: "separator",
      },
      {
        label: "Quit",
        click: () => {
          app.quit();
          this.window.destroy();
        },
      },
    ];

    this.create();
  }

  create(): void {
    this.tray = new Tray(this.trayIcon);
    this.tray.setToolTip("Rhyme");

    if (os.platform() === "win32") {
      this.tray.on("click", () => {
        this.window.show();
        this.window.focus();
      });
    } else if (os.platform() === "darwin") {
      this.tray.on("double-click", () => {
        this.window.show();
        this.window.focus();
      });
    }

    this.setContextMenu();
  }

  setContextMenu(): void {
    const menuTemplate = [...this.songDetails, ...this.menu];

    if (this.tray && !this.tray.isDestroyed()) {
      this.tray.setContextMenu(Menu.buildFromTemplate(menuTemplate));
    }
  }

  refreshTrayIcon(): void {
    if (this.tray) {
      this.tray.setImage(this.trayIcon);
    }
  }
}

export default TrayModule;
