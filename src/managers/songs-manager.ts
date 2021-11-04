import { Song } from '@/share/interfaces';
import { FilesParser } from '@/share/parsers';
import FilesManager from './files-manager';

class SongsManager {
  songs: Song[] = [];

  private listeners = {
    added: [] as ((song: Song) => void)[],
    removed: [] as ((song: Song) => void)[],
    changed: [] as ((song: Song, action: 'added' | 'removed') => void)[],
  };

  constructor() {
    FilesManager.fileAdded((file) => {
      FilesParser.getFileMetadata(file).then((song) => {
        this.songs.push(song);

        this.listeners.added.map((callback) => {
          callback(song);
        });

        this.listeners.changed.map((callback) => {
          callback(song, 'added');
        });
      });
    });

    FilesManager.fileRemoved((file) => {
      // Song that will be removed
      const song = this.songs.find((song) => {
        return song.file === file;
      }) as Song;

      // Remove the song which has the file variable equals to {file}
      this.songs = this.songs.filter((song) => {
        return song.file !== file;
      });

      // Call all the songRemoved callbacks
      this.listeners.removed.map((callback) => {
        callback(song);
      });

      this.listeners.changed.map((callback) => {
        callback(song, 'removed');
      });
    });
  }

  on(method: 'song-removed' | 'song-added' | 'song-changed', callback: (song: Song) => void) {
    switch (method) {
      case 'song-added':
        this.listeners.added.push(callback);
        break;
      case 'song-removed':
        this.listeners.removed.push(callback);
        break;
      case 'song-removed':
        this.listeners.changed.push(callback);
        break;
    }
  }
}

export default new SongsManager();
