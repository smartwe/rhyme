import { app } from 'electron';
import Module from '../module';
import StorageManager from '@/managers/storage-manager';

class StorageManagerModule extends Module {
  constructor(dirname: string) {
    super(dirname);
  }

  async load() {
    this.setDataToStore('settings', {
      musicPath: app.getPath('music'),
      showNotifications: true,
      minimizeToTray: false,
    });

    this.setDataToStore('window-bounds', {
      x: 0,
      y: 0,
      width: 900,
      height: 600,
    });
  }

  setDataToStore(id: string, data: object) {
    if (StorageManager.has(id)) return;
    StorageManager.set(id, data);
  }
}

export default StorageManagerModule;
