import { isExtensionSupported } from '@/share/utils';
import { FSWatcher, watch } from 'chokidar';
import StorageManager from './json-storage-manager';
import path from 'path';
import { Settings } from '@/share/interfaces';
import { writable, Writable, get } from 'svelte/store';

class FilesManager {
  private watcher: FSWatcher;

  files: Writable<string[]> = writable([]);

  listeners = {
    onAdd: [] as ((file: string) => void)[],
    onRemove: [] as ((file: string) => void)[],
  };

  constructor() {
    this.watcher = watch((StorageManager.get('settings') as Settings).musicFolder, {
      ignored: /[\/\\]\./,
      persistent: true,
    });

    this.watcher.on('add', async (file: string) => {
      if (!isExtensionSupported(path.extname(file))) return;
      this.files.set([...get(this.files), file]);
      this.listeners.onAdd.map((callback) => {
        callback(file);
      });
    });

    this.watcher.on('unlink', (file: string) => {
      this.files.set(
        get(this.files).filter((value) => {
          return value !== file;
        })
      );
      this.listeners.onRemove.map((callback) => {
        callback(file);
      });
    });
  }

  on(method: 'add' | 'remove', callback: (file: string) => void) {
    switch (method) {
      case 'add':
        this.listeners.onAdd.push(callback);
        break;

      case 'remove':
        this.listeners.onRemove.push(callback);
        break;
    }
  }
}

export default new FilesManager();
