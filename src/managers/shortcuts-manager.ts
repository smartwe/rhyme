import { CutagerJS, Action, KeyCombo } from 'cutagerjs';

class ShortcutsManager {
  private cutagerjs;
  constructor() {
    this.cutagerjs = new CutagerJS();
  }

  addShortcut(name: string, run: () => void, ...shortcuts: string[]) {
    this.cutagerjs.addAction(new Action(name, new KeyCombo(...shortcuts), run), false);
  }

  removeShortcut(name: string) {
    this.cutagerjs.removeAction(name);
  }

  editAction(name: string, run: () => void, ...shortcuts: string[]) {
    this.removeShortcut(name);
    this.addShortcut(name, run, ...shortcuts);
  }
}

export default new ShortcutsManager();
