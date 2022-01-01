import player from '@/share/lib/player';

import { songs } from './songs-manager';

import { Song } from '@/share/interfaces';
import { get, writable } from 'svelte/store';

export enum PlayingType {
  NORMAL,
}

export const playerIndex = writable(-1);

class PlayingManager {
  audioList: Song[] = [];
  playingType = PlayingType.NORMAL;
  index = {
    value: -1,
    set(newVal: number) {
      this.value = newVal;
      playerIndex.set(newVal);
    },
  };

  constructor() {
    songs.subscribe(() => {
      if (this.playingType !== PlayingType.NORMAL) return;
      this.audioList = get(songs);

      // There is a delay for the 'songs' array to get changed so we are setting a timeout to update the index of the current playing song
      setTimeout(() => {
        this.index.set(this.getFileIndex(player.getSrc()));
      }, 10);
    });

    player.on('end', () => {
      this.next();
    });
  }

  play(file: string) {
    this.index.set(this.getFileIndex(file));
    player.setAudioSrc(file);
    player.play();
  }

  next() {
    this.index.set(this.index.value + 1 >= this.audioList.length ? 0 : this.index.value + 1);

    player.setAudioSrc(this.audioList[this.index.value].file);
    player.play();
  }

  previous() {
    this.index.set(this.index.value - 1 < 0 ? this.audioList.length - 1 : this.index.value - 1);

    player.setAudioSrc(this.audioList[this.index.value].file);
    player.play();
  }

  getFileIndex(file: string): number {
    return this.audioList.findIndex((song) => {
      return song.file === file;
    });
  }
}

export default new PlayingManager();
