import { globalShortcut } from 'electron';
import ModuleWindow from './module-window';
import channels from '@/share/channels';

class GlobalShortcutsModule extends ModuleWindow {
  async load() {
    globalShortcut.register('MediaPlayPause', () => {
      this.window.webContents.send(channels.PLAY_OR_PAUSE);
    });

    globalShortcut.register('MediaPreviousTrack', () => {
      this.window.webContents.send(channels.PREVIOUS);
    });

    globalShortcut.register('MediaNextTrack', () => {
      this.window.webContents.send(channels.NEXT);
    });
  }
}

export default GlobalShortcutsModule;
