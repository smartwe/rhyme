import { writable } from "svelte/store";
import type Player from "./lib/Player";
const storage = require("electron-json-storage");

export const settings = writable<object>(storage.getSync("settings"));
settings.subscribe((value) => {
  storage.set("settings", value, (error: string) => {
    if (error) throw error;
  });
});
export const songs = writable<object[]>([]);

export const albumsList = writable<object[]>([]);
function albumExists(song, albums): boolean {
  let exists = false;
  albums.forEach((album) => {
    if (album["name"] == song["album"]) {
      exists = true;
    }
  });
  return exists;
}
songs.subscribe((value) => {
  let albums = [];
  for (let i = 0; i < value.length; i++) {
    const song = value[i];

    if (albumExists(song, albums)) {
      for (let i = 0; i < albums.length; i++) {
        const element = albums[i];
        if (song["album"] === element["name"]) {
          element["songs"].push(song);
          albums[i] = element;
          break;
        }
      }
      continue;
    }

    albums.push({
      name: song["album"],
      songs: [song],
    });
  }
  albumsList.set(albums);
});
export const songsPlayer = writable<Player>(null);
export const songPlaying = writable<boolean>(null);
export const inAlbum = writable<boolean>(null);
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
