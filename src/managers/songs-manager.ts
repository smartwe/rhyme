import { Song } from '@/share/interfaces';
import { FilesParser } from '@/share/parsers';
import FilesManager from './files-manager';
import { writable, Writable, get } from 'svelte/store';
class SongsManager {
  songs: Writable<Song[]> = writable([]);

  constructor() {
    FilesManager.on('add', (file) => {
      FilesParser.getFileMetadata(file).then((song) => {
        this.songs.set([...get(this.songs), song]);
      });
    });

    FilesManager.on('remove', (file) => {
      this.songs.set(
        get(this.songs).filter((song) => {
          return song.file !== file;
        })
      );
    });
  }
}

const manager = new SongsManager();

export const songs = manager.songs;
export default manager;
