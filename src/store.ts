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
export const songsPlayer = writable<Player>(null);
export const currentSong = writable<object>(null);
