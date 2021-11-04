import { isExtensionSupported } from '@/share/utils';
import { FSWatcher, watch } from 'chokidar';
import StorageManager from './storage-manager';
import path from 'path';
import { Settings } from '@/share/interfaces';

class FilesManager {
  private watcher: FSWatcher;
  addedListeners: ((file: string) => void)[] = [];
  removedListeners: ((file: string) => void)[] = [];

  files: string[] = [];

  constructor() {
    this.watcher = watch((StorageManager.get('settings') as Settings).musicFolder, {
      ignored: /[\/\\]\./,
      persistent: true,
    });

    this.watcher.on('add', async (file: string) => {
      if (!isExtensionSupported(path.extname(file))) return;
      this.files.push(file);
      this.addedListeners.map((callback) => {
        callback(file);
      });
    });

    this.watcher.on('unlink', (file: string) => {
      this.removedListeners.map((callback) => {
        callback(file);
      });

      this.files = this.files.filter((value) => {
        return value !== file;
      });
    });
  }

  fileAdded(callback: (file: string) => void) {
    this.addedListeners.push(callback);
  }

  fileRemoved(callback: (file: string) => void) {
    this.removedListeners.push(callback);
  }
}

export default new FilesManager();
