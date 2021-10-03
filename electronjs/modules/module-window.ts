import Module from "./module";

class ModuleWindow extends Module {
  window;

  constructor(dirname: string, window: Electron.BrowserWindow) {
    super(dirname);
    this.window = window;
  }

  getWindow() {
    return this.window;
  }
}

export default ModuleWindow;
