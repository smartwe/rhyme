import { writable } from "svelte/store";
import type Player from "./lib/Player";
import storage from "electron-json-storage";

export const settings = writable<object>(storage.getSync("settings"));
settings.subscribe((value) => {
  storage.set("settings", value, (error: string) => {
    if (error) throw error;
  });
});
export const songs = writable<object[]>([]);
export const songsPlayer = writable<Player>(null);
export const songPlaying = writable<boolean>(null);
export const repeat = writable<boolean>(null);
export const shuffle = writable<boolean>(null);
export const currentSong = writable<object>(null);
export const volume = writable<number>(1);
export const recentlyPlayed = writable<object[]>(
  storage.getSync("recentlyPlayed").recentlyPlayed ?? []
);
recentlyPlayed.subscribe((value) => {
  storage.set("recentlyPlayed", { recentlyPlayed: value }, (error) => {
    if (error) throw error;
  });
});
songsPlayer.subscribe((val) => {
  if (val) {
    volume.subscribe((value) => {
      val.sound.volume(value);
    });
  }
});
