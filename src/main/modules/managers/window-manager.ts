import Store from 'electron-store';
const store = new Store();
import path from 'path';
import { app, Menu } from 'electron';

import ModuleWindow from '../module-window';

const isDev = !app.isPackaged;

class WindowManagerModule extends ModuleWindow {
  constructor(dirname: string, window: Electron.BrowserWindow) {
    super(dirname, window);
  }

  async load() {
    this.window.loadURL(
      isDev ? 'http:localhost:9000' : `file://${path.join(this.dirname, 'dist', 'renderer', 'index.html')}`
    );
    this.window.setMenu(null);

    if (isDev) {
      const self = this;
      this.window.setMenu(
        Menu.buildFromTemplate([
          {
            label: 'Dev Tools',
            click() {
              self.window.webContents.toggleDevTools();
            },
          },
        ])
      );
    }

    this.window.on('close', () => {
      store.set('window-bounds', this.window.getBounds());
    });
  }
}

export default WindowManagerModule;
