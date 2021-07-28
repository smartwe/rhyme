import { writable, get } from "svelte/store";
import type Player from "./lib/Player";
const storage = require("electron-json-storage");
const { Howler } = require("howler");

// Settings
export const settings = writable<object>(storage.getSync("settings"));
settings.subscribe((value) => {
  storage.set("settings", value, (error: string) => {
    if (error) throw error;
  });
});

// Theme manager
export const themeManager = writable<object>(storage.getSync("theme-manager"));

// Current Theme
export const currentTheme = writable<object>(
  get(themeManager)["installedThemes"].filter((value: object) => {
    return value["id"] === get(themeManager)["currentTheme"];
  })[0]
);

themeManager.subscribe((value) => {
  currentTheme.set(
    value["installedThemes"].filter((value: object) => {
      return value["id"] === get(themeManager)["currentTheme"];
    })[0]
  );
  storage.set("theme-manager", value, (error: string) => {
    if (error) throw error;
  });
});

// Songs Player
export const songsPlayer = writable<Player>(null);

// Albums
export const albumsList = writable<object[]>([]);
function albumExists(song, albums): boolean {
  let exists = false;
  albums.forEach((album) => {
    if (album["name"] === song["album"]) {
      exists = true;
    }
  });
  return exists;
}

// Songs
export const songs = writable<object[]>([]);
songs.subscribe((value) => {
  if (get(songsPlayer)) {
    get(songsPlayer).songs = value;
  }
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

// Artists
export const artistsList = writable<object[]>([]);
function artistExists(song, artists): boolean {
  let exists = false;
  artists.forEach((artist) => {
    if (artist["name"] === song["artist"]) {
      exists = true;
    }
  });
  return exists;
}

// Song Playing boolean
export const songPlaying = writable<boolean>(null);

// Album playing boolean
export const inAlbum = writable<boolean>(null);

// Repeat boolean
export const repeat = writable<boolean>(null);

// Shuffle boolean
export const shuffle = writable<boolean>(null);

// Current song
export const currentSong = writable<object>(null);

// Volume level
export const volume = writable<number>(100);
volume.subscribe((value) => {
  volume.set(+value.toFixed());
  Howler.volume(value / 100);
});

// Recently played songs
export const recentlyPlayed = writable<object[]>(
  storage.getSync("recentlyPlayed").recentlyPlayed ?? []
);
recentlyPlayed.subscribe((value) => {
  storage.set("recentlyPlayed", { recentlyPlayed: value }, (error) => {
    if (error) throw error;
  });
});
