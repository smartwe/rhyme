import { writable, get } from "svelte/store";
import type Player from "./lib/Player";
const Store = require("electron-store");
const store = new Store();

const { Howler } = require("howler");
const { FSWatcher } = require("chokidar");
const { ipcRenderer } = require("electron");

// Chokidar directory watcher
export const watcher = writable<typeof FSWatcher>(null);

// Settings
export const settings = writable<object>(store.get("settings", null) as object);
settings.subscribe((value) => {
  store.set("settings", value);
});

// Theme manager
export const themeManager = writable<object>(
  store.get("theme-manager", null) as object
);

// Current Theme
export const currentTheme = writable<object>(
  get(themeManager)["installedThemes"].filter((value: object) => {
    return value["id"] === get(themeManager)["currentTheme"];
  })[0]
);

currentTheme.subscribe((value) => {
  let newTheme = get(themeManager);
  newTheme["currentTheme"] = value["id"];
  store.set("theme-manager", newTheme);
});

themeManager.subscribe((value) => {
  currentTheme.set(
    value["installedThemes"].filter((value: object) => {
      return value["id"] === get(themeManager)["currentTheme"];
    })[0]
  );

  store.set("theme-manager", value);
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
currentSong.subscribe((value) => {
  if (!value) return;
  value = [
    { label: `Playing ${value["song"]}`, enabled: false },
    { label: `by ${value["artist"]}`, enabled: false },
    { label: `on ${value["album"]}`, enabled: false },
    {
      type: "separator",
    },
  ];
  ipcRenderer.send("song-changed", value);
});

// Volume level
export const volume = writable<number>(100);
volume.subscribe((value) => {
  volume.set(+value.toFixed());
  Howler.volume(value / 100);
});

// Recently played songs
export const recentlyPlayed = writable<object[]>(
  store.get("recently-played") ? store.get("recently-played").value : []
);
recentlyPlayed.subscribe((value) => {
  store.set("recently-played", { value });
});
