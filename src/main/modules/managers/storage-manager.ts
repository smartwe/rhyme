import { app } from 'electron';
import Module from '../module';
import StorageManager from '@/managers/json-storage-manager';

class StorageManagerModule extends Module {
  constructor(dirname: string) {
    super(dirname);
  }

  async load() {
    this.setDataToStore('settings', {
      musicFolder: app.getPath('music'),
      showNotifications: true,
      minimizeToTray: false,
    });

    this.setDataToStore('window-bounds', {
      x: 0,
      y: 0,
      width: 900,
      height: 600,
    });

    this.setDataToStore('theme-manager', {
      currentTheme: 'default-light',
      themes: [
        {
          id: 'default-dark',
          name: 'Default dark',
          author: 'Rhyme Team',
          colors: {
            accentColor: '#ea3548',
            sidebarActiveColor: '#fff',
            panelsColor: '#121212',
            textColor: '#bbbbbb',
            titleColor: '#fff',
            backgroundColor: '#000',
          },
        },
        {
          id: 'default-light',
          name: 'Default light',
          author: 'Rhyme Team',
          colors: {
            accentColor: '#ea3548',
            sidebarActiveColor: '#fff',
            panelsColor: '#e0e0e0',
            textColor: '#5c5c5c',
            titleColor: '#000',
            backgroundColor: '#fff',
          },
        },
      ],
    });
  }

  setDataToStore(id: string, data: object) {
    if (StorageManager.has(id)) return;
    StorageManager.set(id, data);
  }
}

export default StorageManagerModule;
