import { writable } from "svelte/store";
const storage = require("electron-json-storage");

export const settings = writable<object>(storage.getSync("settings"));
export const songs = writable<object[]>([]);
