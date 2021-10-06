const { get } = require("svelte/store");
import channels from "../../share/channels";
import { songPlaying, songsPlayer } from "../store";

const { ipcRenderer } = require("electron");

ipcRenderer.on(channels.PLAY_OR_PAUSE, () => {
  if (get(songPlaying)) {
    get(songsPlayer).pause();
    return;
  }
  get(songsPlayer).resume();
});
ipcRenderer.on(channels.NEXT, () => {
  get(songsPlayer).next();
});
ipcRenderer.on(channels.PREVIOUS, () => {
  get(songsPlayer).previous();
});
